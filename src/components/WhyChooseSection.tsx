import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, Target, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Zap,
    color: "orange",
    title: "AI-Powered in Seconds",
    description:
      "Our artificial intelligence analyses your work history, skills, and the job description you paste in — then writes tailored, achievement-focused bullet points that sound like you, not a generic template. What used to take hours now takes minutes.",
  },
  {
    icon: Target,
    color: "pink",
    title: "Built to Pass ATS Filters",
    description:
      "Over 95% of large companies use Applicant Tracking Systems to automatically reject CVs before a human reads them. CV Nest optimises your content with the right keywords and clean formatting to get you through those filters every time.",
  },
  {
    icon: Shield,
    color: "purple",
    title: "Eight Professional Templates",
    description:
      "Choose from eight expertly designed CV templates — from the polished Classic for finance and law, to the modern Tech layout for developers, to the elegant Creative format for design roles. Every template is ATS-compatible and recruiter-tested.",
  },
  {
    icon: CheckCircle,
    color: "green",
    title: "Import From LinkedIn",
    description:
      "Already have a LinkedIn profile? Upload it as a PDF and CV Nest extracts your entire work history automatically — no copying and pasting. We clean up the formatting, strengthen the language, and give you a polished CV in under a minute.",
  },
  {
    icon: Clock,
    color: "blue",
    title: "Fully Editable After Generation",
    description:
      "Every section of your AI-generated CV can be edited, reordered, or expanded. Add certifications, remove outdated roles, rewrite specific bullet points. Your CV is yours — we're just here to do the heavy lifting.",
  },
  {
    icon: Star,
    color: "amber",
    title: "Completely Free, Always",
    description:
      "No paywalls, no premium tiers, no watermarks, no credit card required. Every template, every AI generation, every PDF download is free. We believe a good CV should be accessible to everyone, not just people who can afford expensive services.",
  },
];

const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
  orange: { bg: "bg-orange-50", text: "text-orange-600", iconBg: "bg-orange-100" },
  pink: { bg: "bg-pink-50", text: "text-pink-600", iconBg: "bg-pink-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", iconBg: "bg-purple-100" },
  green: { bg: "bg-green-50", text: "text-green-600", iconBg: "bg-green-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", iconBg: "bg-blue-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", iconBg: "bg-amber-100" },
};

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
            Why job seekers choose CV Nest
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            Everything you need to land more interviews
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            CV Nest combines AI writing assistance, ATS optimisation, and professional design into one
            free tool — so you can focus on the job search, not the paperwork.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow ${colors.bg}`}
              >
                <div className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
