import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, Edit2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import html2pdf from "html2pdf.js";
import type { CVData } from "@/lib/cv-types";
import { renderCVTemplate } from "@/components/cv-templates";
import { calculateATSScore, getScoreLabel } from "@/lib/ats-score";

interface PreviewStepProps {
  template: string;
  cvData: CVData;
  jobDescription: string;
  onBack: () => void;
  onEdit?: () => void;
}

const PreviewStep = ({ template, cvData, jobDescription, onBack, onEdit }: PreviewStepProps) => {
  const [showMissing, setShowMissing] = useState(false);

  const atsResult = calculateATSScore(cvData, jobDescription);
  const { label, color } = getScoreLabel(atsResult.score);

  const handleDownload = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;
    toast.loading("Generating PDF...", { id: "pdf" });
    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `${cvData.name || "CV"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
      toast.success("PDF downloaded!", { id: "pdf" });
    } catch {
      toast.error("Failed to generate PDF. Please try again.", { id: "pdf" });
    }
  };

  const scoreColor =
    atsResult.score >= 80
      ? "bg-green-500"
      : atsResult.score >= 60
      ? "bg-yellow-500"
      : atsResult.score >= 40
      ? "bg-orange-500"
      : "bg-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
        Your CV is Ready!
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Review your AI-generated CV below
      </p>

      {/* ATS Score Card */}
      {/* <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-5 max-w-2xl mx-auto mb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-5 h-5 ${color}`} />
            <span className="font-semibold text-foreground text-sm">ATS Compatibility Score</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-2xl ${color}`}>{atsResult.score}%</span>
            <Badge
              variant="outline"
              className={`text-xs font-semibold border-current ${color}`}
            >
              {label}
            </Badge>
          </div>
        </div>

        <Progress
          value={atsResult.score}
          className="h-2 mb-3"
          style={{ "--progress-color": scoreColor } as React.CSSProperties}
        />

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>
            <span className="text-green-600 font-semibold">{atsResult.matched.length}</span> of{" "}
            <span className="font-semibold">{atsResult.total}</span> job keywords matched
          </span>
          {atsResult.missing.length > 0 && (
            <button
              onClick={() => setShowMissing((v) => !v)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showMissing ? (
                <>Hide missing <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Show missing <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        {showMissing && atsResult.missing.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-border"
          >
            <div className="flex items-center gap-1 mb-2">
              <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium text-muted-foreground">
                Consider adding these keywords to your CV:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {atsResult.missing.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 text-xs rounded-full bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div> */}

      <div
        id="cv-preview"
        className="bg-white text-gray-900 rounded-xl shadow-elevated p-8 md:p-12 max-w-2xl mx-auto mb-8 print:shadow-none print:rounded-none"
      >
        {renderCVTemplate(template, cvData)}
      </div>

      <div className="flex justify-between max-w-2xl mx-auto gap-3">
        <Button variant="ghost" onClick={onBack}>
          <RotateCcw className="w-4 h-4" />
          Change Template
        </Button>
        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            <Edit2 className="w-4 h-4" />
            Edit CV
          </Button>
        )}
        <Button variant="hero" size="lg" onClick={handleDownload}>
          <Download className="w-5 h-5" />
          Download PDF
        </Button>
      </div>
    </motion.div>
  );
};

export default PreviewStep;
