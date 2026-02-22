import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { toast } from "sonner";
import type { CVData, ExperienceEntry, EducationEntry, CertificationEntry, CustomSection } from "@/lib/cv-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface EditStepProps {
  cvData: CVData;
  onCvDataChange: (data: CVData) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditStep = ({ cvData, onCvDataChange, onSave, onCancel }: EditStepProps) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    personalInfo: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
  });

  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [showCustomSectionDialog, setShowCustomSectionDialog] = useState(false);
  const [newCustomSection, setNewCustomSection] = useState({ name: "", description: "" });

  // Get section order from cvData or initialize default order
  const initializeDefaultOrder = () => {
    const defaultSections = [
      { id: "personalInfo", name: "Personal Information", order: 0 },
      { id: "experience", name: "Experience", order: 1 },
      { id: "education", name: "Education", order: 2 },
      { id: "skills", name: "Skills", order: 3 },
      { id: "certifications", name: "Certifications", order: 4 },
      ...(cvData.customSections?.map((section, idx) => ({
        id: section.id,
        name: section.name,
        order: 5 + idx,
      })) || []),
    ];
    return defaultSections;
  };

  const [sectionOrder, setSectionOrder] = useState(
    cvData.sectionOrder || initializeDefaultOrder()
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePersonalInfoChange = (field: keyof CVData, value: string) => {
    onCvDataChange({
      ...cvData,
      [field]: value,
    });
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceEntry, value: string | string[]) => {
    const updated = [...cvData.experience];
    updated[index] = { ...updated[index], [field]: value };
    onCvDataChange({ ...cvData, experience: updated });
  };

  const addExperience = () => {
    const newExperience: ExperienceEntry = {
      role: "",
      company: "",
      period: "",
      bullets: [],
    };
    onCvDataChange({
      ...cvData,
      experience: [...cvData.experience, newExperience],
    });
  };

  const removeExperience = (index: number) => {
    onCvDataChange({
      ...cvData,
      experience: cvData.experience.filter((_, i) => i !== index),
    });
    toast.success("Experience removed");
  };

  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updated = [...cvData.education];
    updated[index] = { ...updated[index], [field]: value };
    onCvDataChange({ ...cvData, education: updated });
  };

  const addEducation = () => {
    const newEducation: EducationEntry = {
      degree: "",
      institution: "",
      year: "",
    };
    onCvDataChange({
      ...cvData,
      education: [...cvData.education, newEducation],
    });
  };

  const removeEducation = (index: number) => {
    onCvDataChange({
      ...cvData,
      education: cvData.education.filter((_, i) => i !== index),
    });
    toast.success("Education removed");
  };

  const handleSkillsChange = (value: string) => {
    onCvDataChange({
      ...cvData,
      skills: value.split(",").map((skill) => skill.trim()).filter((skill) => skill),
    });
  };

  const handleCertificationChange = (index: number, field: keyof CertificationEntry, value: string) => {
    const updated = [...cvData.certifications];
    updated[index] = { ...updated[index], [field]: value };
    onCvDataChange({ ...cvData, certifications: updated });
  };

  const addCertification = () => {
    const newCert: CertificationEntry = {
      title: "",
      issuer: "",
      date: "",
    };
    onCvDataChange({
      ...cvData,
      certifications: [...cvData.certifications, newCert],
    });
  };

  const removeCertification = (index: number) => {
    onCvDataChange({
      ...cvData,
      certifications: cvData.certifications.filter((_, i) => i !== index),
    });
    toast.success("Certification removed");
  };

  // Custom Section Functions
  const addCustomSection = () => {
    if (!newCustomSection.name.trim()) {
      toast.error("Please enter a section name");
      return;
    }

    const customSection: CustomSection = {
      id: `custom-${Date.now()}`,
      name: newCustomSection.name.trim(),
      description: newCustomSection.description.trim(),
      entries: [],
    };

    const updatedCustomSections = [...(cvData.customSections || []), customSection];
    
    // Add to section order
    const newOrder = {
      id: customSection.id,
      name: customSection.name,
      order: sectionOrder.length,
    };

    setSectionOrder([...sectionOrder, newOrder]);

    onCvDataChange({
      ...cvData,
      customSections: updatedCustomSections,
      sectionOrder: [...sectionOrder, newOrder],
    });

    setNewCustomSection({ name: "", description: "" });
    setShowCustomSectionDialog(false);
    toast.success("Custom section added!");
  };

  const removeCustomSection = (id: string) => {
    const updatedCustomSections = cvData.customSections?.filter(s => s.id !== id) || [];
    const updatedOrder = sectionOrder.filter(s => s.id !== id).map((s, idx) => ({
      ...s,
      order: idx,
    }));

    setSectionOrder(updatedOrder);

    onCvDataChange({
      ...cvData,
      customSections: updatedCustomSections,
      sectionOrder: updatedOrder,
    });

    toast.success("Custom section removed");
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, sectionId: string) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (!draggedSection || draggedSection === targetId) {
      setDraggedSection(null);
      return;
    }

    const draggedIdx = sectionOrder.findIndex(s => s.id === draggedSection);
    const targetIdx = sectionOrder.findIndex(s => s.id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) {
      setDraggedSection(null);
      return;
    }

    const newOrder = [...sectionOrder];
    [newOrder[draggedIdx], newOrder[targetIdx]] = [newOrder[targetIdx], newOrder[draggedIdx]];

    const updatedOrder = newOrder.map((s, idx) => ({ ...s, order: idx }));
    setSectionOrder(updatedOrder);

    onCvDataChange({
      ...cvData,
      sectionOrder: updatedOrder,
    });

    setDraggedSection(null);
    toast.success("Section reordered");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
        Edit Your CV
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Make any changes you'd like. You can edit existing fields, add new sections, or drag sections to reorder them.
      </p>

      <div className="space-y-6 mb-8">
        {/* Render sections in order */}
        {sectionOrder.map((section) => {
          // Personal Information Section
          if (section.id === "personalInfo") {
            return (
              <Card 
                key={section.id}
                className="p-6 cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <button
                    onClick={() => toggleSection("personalInfo")}
                    className="flex items-center justify-between w-full font-heading font-bold text-lg text-foreground hover:text-primary transition-colors"
                  >
                    <span>{section.name}</span>
                    {expandedSections.personalInfo ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedSections.personalInfo && (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={cvData.name}
                          onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Professional Title</label>
                        <Input
                          value={cvData.title}
                          onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          value={cvData.email}
                          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                          placeholder="john@example.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          value={cvData.phone || ""}
                          onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input
                          value={cvData.location}
                          onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Professional Summary</label>
                        <Textarea
                          value={cvData.summary}
                          onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                          placeholder="A brief summary of your professional background..."
                          className="min-h-24"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          }

          // Experience Section
          if (section.id === "experience") {
            return (
              <Card 
                key={section.id}
                className="p-6 cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <button
                    onClick={() => toggleSection("experience")}
                    className="flex items-center justify-between flex-1 font-heading font-bold text-lg text-foreground hover:text-primary transition-colors"
                  >
                    <span>{section.name}</span>
                    {expandedSections.experience ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedSections.experience && (
                  <div className="mt-6 space-y-6">
                    {cvData.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg bg-muted/30">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-foreground">Experience {idx + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(idx)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                              placeholder="Job Title"
                              value={exp.role}
                              onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                            />
                            <Input
                              placeholder="Company Name"
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                            />
                          </div>
                          <Input
                            placeholder="e.g., Jan 2020 - Dec 2021"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(idx, "period", e.target.value)}
                          />
                          <Textarea
                            placeholder="Describe your responsibilities and achievements (one per line)"
                            value={exp.bullets.join("\n")}
                            onChange={(e) =>
                              handleExperienceChange(
                                idx,
                                "bullets",
                                e.target.value.split("\n").filter((b) => b.trim())
                              )
                            }
                            className="min-h-20"
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addExperience}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                )}
              </Card>
            );
          }

          // Education Section
          if (section.id === "education") {
            return (
              <Card 
                key={section.id}
                className="p-6 cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <button
                    onClick={() => toggleSection("education")}
                    className="flex items-center justify-between w-full font-heading font-bold text-lg text-foreground hover:text-primary transition-colors"
                  >
                    <span>{section.name}</span>
                    {expandedSections.education ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedSections.education && (
                  <div className="mt-6 space-y-6">
                    {cvData.education.map((edu, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg bg-muted/30">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-foreground">Education {idx + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(idx)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <Input
                            placeholder="Degree (e.g., Bachelor of Science)"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                          />
                          <Input
                            placeholder="Institution Name"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                          />
                          <Input
                            placeholder="Year (e.g., 2020)"
                            value={edu.year}
                            onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addEducation}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}
              </Card>
            );
          }

          // Skills Section
          if (section.id === "skills") {
            return (
              <Card 
                key={section.id}
                className="p-6 cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <button
                    onClick={() => toggleSection("skills")}
                    className="flex items-center justify-between w-full font-heading font-bold text-lg text-foreground hover:text-primary transition-colors"
                  >
                    <span>{section.name}</span>
                    {expandedSections.skills ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedSections.skills && (
                  <div className="mt-6">
                    <Textarea
                      placeholder="Enter skills separated by commas (e.g., React, TypeScript, Node.js)"
                      value={cvData.skills.join(", ")}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      className="min-h-20"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Tip: Separate skills with commas
                    </p>
                  </div>
                )}
              </Card>
            );
          }

          // Certifications Section
          if (section.id === "certifications") {
            return (
              <Card 
                key={section.id}
                className="p-6 cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <button
                    onClick={() => toggleSection("certifications")}
                    className="flex items-center justify-between w-full font-heading font-bold text-lg text-foreground hover:text-primary transition-colors"
                  >
                    <span>{section.name}</span>
                    {expandedSections.certifications ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedSections.certifications && (
                  <div className="mt-6 space-y-6">
                    {cvData.certifications.map((cert, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg bg-muted/30">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-foreground">Certification {idx + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(idx)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <Input
                            placeholder="Certification Title"
                            value={cert.title}
                            onChange={(e) => handleCertificationChange(idx, "title", e.target.value)}
                          />
                          <Input
                            placeholder="Issuing Organization"
                            value={cert.issuer}
                            onChange={(e) => handleCertificationChange(idx, "issuer", e.target.value)}
                          />
                          <Input
                            placeholder="Date (e.g., Jan 2023)"
                            value={cert.date || ""}
                            onChange={(e) => handleCertificationChange(idx, "date", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addCertification}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Certification
                    </Button>
                  </div>
                )}
              </Card>
            );
          }

          // Custom Sections
          const customSection = cvData.customSections?.find(cs => cs.id === section.id);
          if (customSection) {
            return (
              <Card 
                key={section.id}
                className="p-6 cursor-move hover:border-primary/50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between flex-1 font-heading font-bold text-lg text-foreground hover:text-primary transition-colors"
                    >
                      <span>{customSection.name}</span>
                      {expandedSections[section.id] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomSection(section.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {expandedSections[section.id] && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-4 italic">
                      {customSection.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Custom section content management coming soon.
                    </p>
                  </div>
                )}
              </Card>
            );
          }

          return null;
        })}
      </div>

      {/* Add Custom Section Button */}
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => setShowCustomSectionDialog(true)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Section
        </Button>
      </div>

      {/* Custom Section Dialog */}
      <Dialog open={showCustomSectionDialog} onOpenChange={setShowCustomSectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Name</label>
              <Input
                placeholder="e.g., Publications, Languages, Volunteer Work"
                value={newCustomSection.name}
                onChange={(e) => setNewCustomSection({ ...newCustomSection, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <Textarea
                placeholder="Brief description of what this section contains..."
                value={newCustomSection.description}
                onChange={(e) => setNewCustomSection({ ...newCustomSection, description: e.target.value })}
                className="min-h-16"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCustomSectionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addCustomSection}>
              Create Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="hero" size="lg" onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
};

export default EditStep;
