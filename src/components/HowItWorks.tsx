import { motion } from "framer-motion";
import { Upload, Sparkles, Edit3, Download, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your LinkedIn PDF or enter manually",
    description:
      "Start by importing your existing LinkedIn profile as a PDF — CV Nest extracts your entire work history, education, and skills automatically. No LinkedIn? No problem. Use our guided manual entry form to add your details at your own pace. Either way, you're set up and ready in under two minutes.",
    tip: "Tip: To save your LinkedIn profile as PDF, go to your profile, click 'More', then 'Save to PDF'.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Paste the job description and let AI do the work",
    description:
      "Copy and paste the job description you're targeting. Our AI reads both your experience and the job requirements, then tailors your CV to match. It rewrites vague duty descriptions into specific, quantified achievements, selects the most relevant experience, and ensures the right keywords are in place to pass ATS screening.",
    tip: "Tip: The more specific the job description, the better the tailoring. Even a short job ad makes a significant difference.",
  },
  {
    number: "03",
    icon: Edit3,
    title: "Choose a template and review your CV",
    description:
      "Pick from eight professional templates suited to your industry and career level — from the authoritative Executive format for senior roles to the Tech layout built for developers. Every template is ATS-compatible. Review your generated CV, edit any section you want to personalise, and reorder content to put your strongest material first.",
    tip: "Tip: Use the Classic or Modern template if you're unsure — they work well across virtually all industries.",
  },
  {
    number: "04",
    icon: Download,
    title: "Download your polished PDF and apply",
    description:
      "When you're happy with your CV, download it as a high-quality PDF with one click. Your formatting is preserved perfectly across all devices and operating systems. You can generate as many versions as you need for different roles — completely free, with no watermarks or limits.",
    tip: "Tip: Create a separate version for each type of role you're applying to. Small tweaks per application significantly improve your response rate.",
  },
];

const HowItWorksDetailed = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50/60 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            From blank page to interview-ready CV in four steps
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            CV Nest is designed to be fast — most people have a complete, tailored CV ready to send
            within ten minutes. Here's exactly what the process looks like.
          </p>
        </motion.div>

        <div className="space-y-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 bg-white rounded-2xl p-6 md:p-8 border border-orange-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Step number + icon */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <span className="text-3xl font-black text-orange-200 leading-none">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{step.description}</p>
                  <p className="text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 inline-block">
                    {step.tip}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/builder")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-all text-base"
          >
            Build my CV now — it's free
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-slate-400 mt-3">No account needed. No credit card. No catch.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksDetailed;
