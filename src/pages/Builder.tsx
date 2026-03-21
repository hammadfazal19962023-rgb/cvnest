import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, LogIn, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/StepIndicator";
import UploadStep from "@/components/UploadStep";
import ManualEntryStep from "@/components/ManualEntryStep";
import type { ManualProfile } from "@/components/ManualEntryStep";
import JobDescriptionStep from "@/components/JobDescriptionStep";
import TemplateStep from "@/components/TemplateStep";
import PreviewStep from "@/components/PreviewStep";
import EditStep from "@/components/EditStep";
import { extractTextFromPdf } from "@/lib/pdf-utils";
import { supabase } from "@/integrations/supabase/client";
import type { CVData } from "@/lib/cv-types";

const steps = ["Upload", "Job Description", "Template", "Preview"];

const emptyProfile: ManualProfile = {
  name: "", email: "", phone: "", postcode: "", location: "", title: "",
  summary: "", experience: [], education: [], skills: "", certifications: "",
};

const Builder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [useManualEntry, setUseManualEntry] = useState(true);
  const [manualProfile, setManualProfile] = useState<ManualProfile>(emptyProfile);

  // Check if a template was pre-selected from hero page
  useEffect(() => {
    const state = location.state as { selectedTemplate?: string } | null;
    if (state?.selectedTemplate) {
      setSelectedTemplate(state.selectedTemplate);
    }
  }, [location]);

  const buildProfileText = (p: ManualProfile): string => {
    let text = `Name: ${p.name}\nTitle: ${p.title}\nEmail: ${p.email}\nPhone: ${p.phone}\nPostcode: ${p.postcode}\nLocation: ${p.location}\n\nSummary: ${p.summary}\n`;
    if (p.experience.length) {
      text += "\nExperience:\n";
      p.experience.forEach((e) => {
        text += `- ${e.company} (${e.startDate} – ${e.endDate})\n`;
      });
    }
    if (p.education.length) {
      text += "\nEducation:\n";
      p.education.forEach((e) => {
        text += `- ${e.degree}, ${e.institution} (${e.year})\n`;
      });
    }
    if (p.skills.trim()) text += `\nSkills: ${p.skills}\n`;
    if (p.certifications.trim()) text += `\nCertifications: ${p.certifications}\n`;
    return text;
  };

  const handleGenerate = async () => {
    if (!useManualEntry && !file) {
      toast.error("Please upload your LinkedIn PDF first.");
      return;
    }

    setIsGenerating(true);
    try {
      let profileText: string;

      if (useManualEntry) {
        profileText = buildProfileText(manualProfile);
      } else {
        profileText = await extractTextFromPdf(file!);
        if (!profileText.trim()) {
          toast.error("Could not extract text from the PDF. Please try a different file.");
          setIsGenerating(false);
          return;
        }
      }

      if (!jobDescription) {
        setJobDescription(" ");
      }
      const { data, error } = await supabase.functions.invoke("generate-cv", {
        body: { pdfText: profileText, jobDescription: jobDescription || " ", template: selectedTemplate },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        toast.error(data.error);
        setIsGenerating(false);
        return;
      }

      setCvData(data.cv);
      setCurrentStep(3);
    } catch (err: any) {
      console.error("CV generation error:", err);
      toast.error(err.message || "Failed to generate CV. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-heading text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              CV Nest
            </span>
          </button>
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { signOut(); toast.success("Signed out"); }}
              className="text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/auth")}
              className="text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <LogIn className="w-4 h-4 mr-1" /> Sign In
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main content with reduced width for ads */}
        <div className="flex justify-center gap-6">
          {/* Left Ad Space */}
          {/* <div className="hidden lg:block w-40 flex-shrink-0 sticky top-24 self-start">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100">
              <div className="text-xs text-gray-400 mb-2">Advertisement</div>
              <div className="w-full h-60 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Ad Space</span>
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="w-full max-w-3xl">
            <StepIndicator steps={steps} currentStep={currentStep} />

            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <AnimatePresence mode="wait">
                {currentStep === 0 && useManualEntry && (
                  <ManualEntryStep
                    key="manual"
                    profile={manualProfile}
                    onProfileChange={setManualProfile}
                    onNext={() => setCurrentStep(1)}
                    onBack={() => {
                      setUseManualEntry(false);
                      setFile(null);
                    }}
                  />
                )}
                {currentStep === 0 && !useManualEntry && (
                  <UploadStep
                    key="upload"
                    file={file}
                    onFileChange={setFile}
                    onNext={() => setCurrentStep(1)}
                    onManualEntry={() => {
                      setUseManualEntry(true);
                      setFile(null);
                    }}
                  />
                )}
                {currentStep === 1 && (
                  <JobDescriptionStep
                    key="job"
                    jobDescription={jobDescription}
                    onJobDescriptionChange={setJobDescription}
                    onNext={() => setCurrentStep(2)}
                    onBack={() => setCurrentStep(0)}
                  />
                )}
                {currentStep === 2 && (
                  <TemplateStep
                    key="template"
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                    onGenerate={handleGenerate}
                    onBack={() => setCurrentStep(1)}
                    isGenerating={isGenerating}
                  />
                )}
                {currentStep === 3 && cvData && !isEditMode && (
                  <PreviewStep
                    key="preview"
                    template={selectedTemplate}
                    cvData={cvData}
                    jobDescription={jobDescription}
                    onBack={() => setCurrentStep(2)}
                    onEdit={() => setIsEditMode(true)}
                  />
                )}
                {currentStep === 3 && cvData && isEditMode && (
                  <EditStep
                    key="edit"
                    cvData={cvData}
                    onCvDataChange={setCvData}
                    onSave={() => {
                      toast.success("CV updated successfully!");
                      setIsEditMode(false);
                    }}
                    onCancel={() => setIsEditMode(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Ad Space */}
          {/* <div className="hidden lg:block w-40 flex-shrink-0 sticky top-24 self-start">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100">
              <div className="text-xs text-gray-400 mb-2">Advertisement</div>
              <div className="w-full h-60 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Ad Space</span>
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <footer className="relative main-gradient-bg bg-gradient-to-r from-orange-50/80 via-yellow-50/80 to-pink-50/80 border-t-2 border-orange-100 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CV Nest. Free forever.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Builder;