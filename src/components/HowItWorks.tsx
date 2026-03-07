import { motion } from "framer-motion";
import { Linkedin, Upload, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Linkedin,
      color: "orange",
      title: "Import from LinkedIn",
      description: "One click and your profile is ready"
    },
    {
      icon: Upload,
      color: "pink",
      title: "Or enter manually",
      description: "Type it in, we'll make it pretty"
    },
    {
      icon: Sparkles,
      color: "purple",
      title: "AI works its magic",
      description: "Beautiful resume, zero effort"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="mb-16"
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border-2 border-white">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colorClasses = {
              orange: "bg-orange-100 text-orange-500",
              pink: "bg-pink-100 text-pink-500",
              purple: "bg-purple-100 text-purple-500"
            }[step.color];

            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${colorClasses} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-700 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;