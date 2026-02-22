import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionStepProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const JobDescriptionStep = ({
  jobDescription,
  onJobDescriptionChange,
  onNext,
  onBack,
}: JobDescriptionStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto"
    >
      <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
        Paste the Job Description
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        AI will tailor your CV to match this specific role
      </p>

      <Textarea
        placeholder="Paste the full job description here... The more detail, the better your CV will be tailored."
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        className="min-h-[250px] resize-none bg-card shadow-card text-base leading-relaxed"
      />

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!jobDescription.trim()} size="lg">
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default JobDescriptionStep;
