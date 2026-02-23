import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

      const { data, error } = await supabase.functions.invoke("generate-cv", {
        body: { pdfText: profileText, jobDescription, template: selectedTemplate },
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-heading text-lg font-bold text-foreground">
              cvnest
            </span>
          </button>
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => { signOut(); toast.success("Signed out"); }}>
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              <LogIn className="w-4 h-4 mr-1" /> Sign In
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <StepIndicator steps={steps} currentStep={currentStep} />

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
      </main>
    </div>
  );
};

export default Builder;
