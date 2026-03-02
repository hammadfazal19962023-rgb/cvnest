import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Rocket, Smile, Coffee, Brain, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

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

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 overflow-hidden">
      {/* Playful doodles - hidden on mobile */}
      <div className="hidden md:block absolute inset-0 opacity-30">
        <svg className="absolute top-20 left-10 w-32 h-32" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="orange" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        </svg>
        <svg className="absolute bottom-20 right-10 w-40 h-40" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" stroke="pink" strokeWidth="2" fill="none" strokeDasharray="6,4" />
        </svg>
        <svg className="absolute top-40 right-40 w-24 h-24" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" stroke="blue" strokeWidth="2" fill="none" strokeDasharray="4,3" />
        </svg>
      </div>

      {/* Floating emojis - hidden on mobile */}
      <motion.div
        className="hidden md:block absolute top-32 left-1/4 text-4xl"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🚀
      </motion.div>
      <motion.div
        className="hidden md:block absolute bottom-40 right-1/4 text-4xl"
        animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div
        className="hidden md:block absolute top-60 right-20 text-4xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        💼
      </motion.div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Fun badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 mb-8 shadow-lg border-2 border-orange-200"
          >
            <Brain className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-slate-700">Your new career bestie</span>
            <Smile className="w-5 h-5 text-yellow-500" />
          </motion.div>

          {/* Playful heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl md:text-7xl font-black mb-6"
          >
            <span className="relative inline-block">
              <span className="relative z-10">CV building</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-200 -rotate-1" />
            </span>
            <br />
            <span className="text-orange-500">but make it</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              actually fun
            </span>
          </motion.h1>

          {/* Friendly description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-12"
          >
            No boring forms. No judgment. Just a friendly AI that helps you 
            brag about yourself (yes, you're that awesome).
          </motion.p>

          {/* CTA with personality */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button
              size="lg"
              onClick={() => navigate("/builder")}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white border-0 rounded-2xl px-10 py-7 text-lg shadow-xl shadow-orange-200"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Your Adventure
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowTemplates(true)}
              className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm rounded-2xl px-10 py-7 text-lg"
            >
              <Coffee className="w-5 h-5 mr-2" />
              See Templates (it's free)
            </Button>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                emoji: "🤖",
                title: "AI bestie",
                desc: "Knows what to say when you don't",
              },
              {
                emoji: "⚡",
                title: "Lightning fast",
                desc: "Because who has time for this?",
              },
              {
                emoji: "🎨",
                title: "Pretty templates",
                desc: "That actually look good",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-white"
              >
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Fun fact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-sm text-slate-400"
          >
            🎉 PS: We're 100% free because we hate paywalls as much as you do
          </motion.p>
        </div>
      </div>

      {/* Templates Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose Your Template</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-center mb-6">
            Pick a style that fits your personality
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                }}
                className={cn(
                  "relative rounded-xl border-2 bg-card overflow-hidden transition-all text-left group",
                  selectedTemplate === template.id
                    ? "border-accent shadow-lg"
                    : "border-border hover:border-accent/40 shadow-sm"
                )}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center z-10">
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

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowTemplates(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedTemplate) {
                  setShowTemplates(false);
                  navigate("/builder", { state: { selectedTemplate } });
                }
              }}
              disabled={!selectedTemplate}
            >
              Continue with this template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;