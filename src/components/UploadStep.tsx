import { motion } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

interface UploadStepProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onNext: () => void;
  onManualEntry: () => void;
}

const UploadStep = ({ file, onFileChange, onNext, onManualEntry }: UploadStepProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile?.type === "application/pdf") {
        onFileChange(droppedFile);
      }
    },
    [onFileChange]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onFileChange(selectedFile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto"
    >
      <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
        Upload Your LinkedIn PDF
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Go to your LinkedIn profile → More → Save to PDF
      </p>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/50 hover:bg-muted/50"
          }`}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-1">
            Drag & drop your LinkedIn PDF here
          </p>
          <p className="text-sm text-muted-foreground">or click to browse</p>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div className="bg-card rounded-xl p-6 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            onClick={() => onFileChange(null)}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <button
          type="button"
          onClick={onManualEntry}
          className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4 transition-colors"
        >
          Don't have a LinkedIn PDF? Enter details manually
        </button>
        <Button onClick={onNext} disabled={!file} size="lg">
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default UploadStep;
