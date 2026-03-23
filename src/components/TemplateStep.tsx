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
        <div className="h-3 w-20 rounded bg-orange-400/80" />
        <div className="h-1.5 w-full rounded bg-gray-300/50" />
        <div className="h-1.5 w-3/4 rounded bg-gray-300/50" />
        <div className="mt-3 h-2 w-16 rounded bg-gray-400/30" />
        <div className="h-1.5 w-full rounded bg-gray-300/40" />
        <div className="h-1.5 w-5/6 rounded bg-gray-300/40" />
        <div className="mt-3 h-2 w-16 rounded bg-gray-400/30" />
        <div className="h-1.5 w-full rounded bg-gray-300/40" />
        <div className="h-1.5 w-2/3 rounded bg-gray-300/40" />
      </div>
    ),
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless layout, serif headers, elegant spacing",
    preview: (
      <div className="space-y-2 p-3 text-center">
        <div className="h-3 w-24 rounded bg-gray-500/40 mx-auto" />
        <div className="h-0.5 w-full bg-gray-300/50" />
        <div className="text-left space-y-1 mt-2">
          <div className="h-2 w-14 rounded bg-gray-400/30" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-4/5 rounded bg-gray-300/40" />
          <div className="mt-2 h-2 w-14 rounded bg-gray-400/30" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-3/4 rounded bg-gray-300/40" />
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
        <div className="w-1/3 space-y-2 bg-orange-50 rounded p-2">
          <div className="h-6 w-6 rounded-full bg-orange-400/60 mx-auto" />
          <div className="h-1.5 w-full rounded bg-gray-300/50" />
          <div className="h-1.5 w-3/4 rounded bg-gray-300/50" />
          <div className="mt-2 h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-2.5 w-20 rounded bg-gray-400/30" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-5/6 rounded bg-gray-300/40" />
          <div className="mt-2 h-2.5 w-16 rounded bg-gray-400/30" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-2/3 rounded bg-gray-300/40" />
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
        <div className="h-3 w-28 rounded bg-gray-500/40" />
        <div className="h-1 w-10 rounded bg-orange-400/60" />
        <div className="space-y-1.5 mt-3">
          <div className="h-1.5 w-full rounded bg-gray-300/30" />
          <div className="h-1.5 w-11/12 rounded bg-gray-300/30" />
          <div className="h-1.5 w-3/4 rounded bg-gray-300/30" />
        </div>
        <div className="space-y-1.5 mt-3">
          <div className="h-1.5 w-full rounded bg-gray-300/30" />
          <div className="h-1.5 w-5/6 rounded bg-gray-300/30" />
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
        <div className="bg-orange-600/90 p-3 rounded-t space-y-1">
          <div className="h-3 w-24 rounded bg-white/80" />
          <div className="h-1.5 w-32 rounded bg-white/30" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-2 w-16 rounded bg-gray-400/30" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-4/5 rounded bg-gray-300/40" />
          <div className="mt-2 h-2 w-14 rounded bg-gray-400/30" />
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
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
          <div className="h-5 w-5 rounded bg-orange-400/50" />
          <div className="h-3 w-20 rounded bg-gray-500/40" />
        </div>
        <div className="flex gap-1 mt-2 flex-wrap">
          <div className="h-4 w-10 rounded-full bg-orange-200/60" />
          <div className="h-4 w-12 rounded-full bg-orange-200/60" />
          <div className="h-4 w-8 rounded-full bg-orange-200/60" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-8 w-full rounded bg-gray-100 p-1.5">
            <div className="h-full w-4/5 rounded bg-orange-300/50" />
          </div>
          <div className="h-8 w-full rounded bg-gray-100 p-1.5">
            <div className="h-full w-3/5 rounded bg-orange-300/50" />
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
        <div className="border-b-2 border-pink-300 pb-2">
          <div className="h-3.5 w-28 rounded bg-gray-500/40" />
          <div className="h-1.5 w-16 rounded bg-pink-400/60 mt-1" />
        </div>
        <div className="border-l-2 border-pink-200 pl-2 mt-2">
          <div className="h-1.5 w-full rounded bg-gray-300/30" />
          <div className="h-1.5 w-4/5 rounded bg-gray-300/30 mt-1" />
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-12 rounded bg-pink-400/40" />
          <div className="h-1.5 w-full rounded bg-gray-300/30" />
          <div className="h-1.5 w-3/4 rounded bg-gray-300/30" />
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
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-t space-y-1">
          <div className="h-3.5 w-24 rounded bg-white/80" />
          <div className="h-2 w-20 rounded bg-white/40" />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex gap-1 flex-wrap">
            <div className="h-4 w-10 rounded-full bg-orange-500/20" />
            <div className="h-4 w-12 rounded-full bg-orange-500/20" />
            <div className="h-4 w-8 rounded-full bg-orange-500/20" />
          </div>
          <div className="h-1.5 w-full rounded bg-gray-300/40" />
          <div className="h-1.5 w-5/6 rounded bg-gray-300/40" />
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
    <div className="w-full">
      <h2 className="font-heading text-3xl font-black mb-2 text-center bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
        Choose Your Template
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Pick a style that fits your personality
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={cn(
              "relative rounded-xl border-2 bg-white overflow-hidden transition-all text-left group hover:shadow-xl",
              selectedTemplate === template.id
                ? "border-orange-500 shadow-lg ring-2 ring-orange-500/20"
                : "border-orange-100 hover:border-orange-300"
            )}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center z-10">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className="h-40 bg-gradient-to-br from-orange-50 to-pink-50">{template.preview}</div>
            <div className="p-4 border-t border-orange-100">
              <p className="font-semibold text-gray-800">{template.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
        >
          Back
        </Button>
        <Button
          onClick={onGenerate}
          disabled={!selectedTemplate || isGenerating}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generating...
            </motion.div>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate CV
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TemplateStep;