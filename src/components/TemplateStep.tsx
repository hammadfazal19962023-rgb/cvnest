import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateStepProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean lines, bold headers, subtle accents",
    preview: (
      <div className="space-y-2 p-3">
        <div className="h-3 w-20 rounded bg-accent/80" />
        <div className="h-1.5 w-full rounded bg-foreground/10" />
        <div className="h-1.5 w-3/4 rounded bg-foreground/10" />
        <div className="mt-3 h-2 w-16 rounded bg-foreground/20" />
        <div className="h-1.5 w-full rounded bg-foreground/7" />
        <div className="h-1.5 w-5/6 rounded bg-foreground/7" />
        <div className="mt-3 h-2 w-16 rounded bg-foreground/20" />
        <div className="h-1.5 w-full rounded bg-foreground/7" />
        <div className="h-1.5 w-2/3 rounded bg-foreground/7" />
      </div>
    ),
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless layout, serif headers, elegant spacing",
    preview: (
      <div className="space-y-2 p-3 text-center">
        <div className="h-3 w-24 rounded bg-foreground/30 mx-auto" />
        <div className="h-0.5 w-full bg-foreground/10" />
        <div className="text-left space-y-1 mt-2">
          <div className="h-2 w-14 rounded bg-foreground/20" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-4/5 rounded bg-foreground/7" />
          <div className="mt-2 h-2 w-14 rounded bg-foreground/20" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-3/4 rounded bg-foreground/7" />
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    name: "Creative",
    description: "Two-column sidebar with visual highlights",
    preview: (
      <div className="flex gap-2 p-3 h-full">
        <div className="w-1/3 space-y-2 bg-primary/5 rounded p-2">
          <div className="h-6 w-6 rounded-full bg-accent/60 mx-auto" />
          <div className="h-1.5 w-full rounded bg-foreground/10" />
          <div className="h-1.5 w-3/4 rounded bg-foreground/10" />
          <div className="mt-2 h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-2.5 w-20 rounded bg-foreground/20" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-5/6 rounded bg-foreground/7" />
          <div className="mt-2 h-2.5 w-16 rounded bg-foreground/20" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-2/3 rounded bg-foreground/7" />
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Whitespace-focused, ultra-clean, no distractions",
    preview: (
      <div className="p-4 space-y-3">
        <div className="h-3 w-28 rounded bg-foreground/25" />
        <div className="h-1 w-10 rounded bg-accent/60" />
        <div className="space-y-1.5 mt-3">
          <div className="h-1.5 w-full rounded bg-foreground/5" />
          <div className="h-1.5 w-11/12 rounded bg-foreground/5" />
          <div className="h-1.5 w-3/4 rounded bg-foreground/5" />
        </div>
        <div className="space-y-1.5 mt-3">
          <div className="h-1.5 w-full rounded bg-foreground/5" />
          <div className="h-1.5 w-5/6 rounded bg-foreground/5" />
        </div>
      </div>
    ),
  },
  {
    id: "executive",
    name: "Executive",
    description: "Dark header banner, corporate & authoritative",
    preview: (
      <div className="h-full">
        <div className="bg-primary/90 p-3 rounded-t space-y-1">
          <div className="h-3 w-24 rounded bg-primary-foreground/80" />
          <div className="h-1.5 w-32 rounded bg-primary-foreground/30" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-2 w-16 rounded bg-foreground/20" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-4/5 rounded bg-foreground/7" />
          <div className="mt-2 h-2 w-14 rounded bg-foreground/20" />
          <div className="h-1.5 w-full rounded bg-foreground/7" />
        </div>
      </div>
    ),
  },
  {
    id: "techie",
    name: "Tech",
    description: "Skills-first layout with progress bars & tags",
    preview: (
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-indigo-400/50" />
          <div className="h-3 w-20 rounded bg-foreground/25" />
        </div>
        <div className="flex gap-1 mt-2 flex-wrap">
          <div className="h-4 w-10 rounded-full bg-indigo-200/40" />
          <div className="h-4 w-12 rounded-full bg-indigo-200/40" />
          <div className="h-4 w-8 rounded-full bg-indigo-200/40" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-8 w-full rounded bg-foreground/5 p-1.5">
            <div className="h-full w-4/5 rounded bg-indigo-300/30" />
          </div>
          <div className="h-8 w-full rounded bg-foreground/5 p-1.5">
            <div className="h-full w-3/5 rounded bg-indigo-300/30" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Rose accents, refined typography, soft borders",
    preview: (
      <div className="p-3 space-y-2">
        <div className="border-b-2 border-rose-300 pb-2">
          <div className="h-3.5 w-28 rounded bg-foreground/20" />
          <div className="h-1.5 w-16 rounded bg-rose-300/60 mt-1" />
        </div>
        <div className="border-l-2 border-rose-200 pl-2 mt-2">
          <div className="h-1.5 w-full rounded bg-foreground/5" />
          <div className="h-1.5 w-4/5 rounded bg-foreground/5 mt-1" />
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-12 rounded bg-rose-300/40" />
          <div className="h-1.5 w-full rounded bg-foreground/5" />
          <div className="h-1.5 w-3/4 rounded bg-foreground/5" />
        </div>
      </div>
    ),
  },
  {
    id: "bold",
    name: "Bold",
    description: "Vibrant gradient header, strong typographic contrast",
    preview: (
      <div className="h-full">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-t space-y-1">
          <div className="h-3.5 w-24 rounded bg-white/80" />
          <div className="h-2 w-20 rounded bg-white/40" />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-1 flex-wrap">
            <div className="h-4 w-10 rounded-full bg-blue-500/20" />
            <div className="h-4 w-12 rounded-full bg-blue-500/20" />
            <div className="h-4 w-8 rounded-full bg-blue-500/20" />
          </div>
          <div className="h-1.5 w-full rounded bg-foreground/7" />
          <div className="h-1.5 w-5/6 rounded bg-foreground/7" />
        </div>
      </div>
    ),
  },
];

const TemplateStep = ({
  selectedTemplate,
  onTemplateSelect,
  onGenerate,
  onBack,
  isGenerating,
}: TemplateStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
        Choose Your Template
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Pick a style that fits your personality
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={cn(
              "relative rounded-xl border-2 bg-card overflow-hidden transition-all text-left group",
              selectedTemplate === template.id
                ? "border-accent shadow-elevated"
                : "border-border hover:border-accent/40 shadow-card"
            )}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 gradient-accent rounded-full flex items-center justify-center z-10">
                <Check className="w-3.5 h-3.5 text-accent-foreground" />
              </div>
            )}
            <div className="h-40 bg-muted/50">{template.preview}</div>
            <div className="p-4">
              <p className="font-semibold text-foreground">{template.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="hero"
          size="lg"
          onClick={onGenerate}
          disabled={!selectedTemplate || isGenerating}
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isGenerating ? "Generating..." : "Generate CV"}
        </Button>
      </div>
    </motion.div>
  );
};

export default TemplateStep;
