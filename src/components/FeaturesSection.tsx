import { motion } from "framer-motion";
import { Upload, Wand2, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload or type",
    description: "Drop your LinkedIn PDF or enter details manually. We extract every detail.",
  },
  {
    icon: Wand2,
    number: "02",
    title: "AI tailors it",
    description: "Paste a job description and our AI reshapes your CV to match perfectly.",
  },
  {
    icon: Download,
    number: "03",
    title: "Download & send",
    description: "Pick a template, preview your CV, and download a polished PDF instantly.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.p
          className="text-xs tracking-[0.35em] uppercase text-accent font-medium text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How it works
        </motion.p>
        <motion.h2
          className="font-heading text-3xl md:text-5xl font-bold text-foreground text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Three steps. That's it.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-16 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border mb-6">
                <step.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">{step.number}</p>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
