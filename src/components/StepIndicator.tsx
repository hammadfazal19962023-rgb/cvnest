import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                index < currentStep
                  ? "gradient-accent text-accent-foreground"
                  : index === currentStep
                  ? "bg-primary text-primary-foreground ring-4 ring-accent/20"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span
              className={cn(
                "text-sm font-medium hidden sm:block transition-colors",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-8 md:w-16 h-0.5 rounded transition-colors",
                index < currentStep ? "bg-accent" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
