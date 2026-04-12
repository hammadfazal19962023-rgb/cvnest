import { motion } from "framer-motion";

const industries = [
  {
    emoji: "💻",
    name: "Technology & Software",
    description:
      "Developers, engineers, data scientists, and product managers need CVs that lead with their tech stack and showcase project impact. CV Nest's Tech template puts your skills front and centre, and the AI ensures tools like Python, AWS, or React are positioned for ATS matching.",
  },
  {
    emoji: "📊",
    name: "Finance & Banking",
    description:
      "For analysts, accountants, investment managers, and banking professionals, credibility is everything. The Classic template presents experience with the formality the sector expects, while AI-generated bullet points emphasise metrics, portfolio sizes, and risk outcomes.",
  },
  {
    emoji: "🏥",
    name: "Healthcare & Medical",
    description:
      "Nurses, doctors, allied health professionals, and healthcare administrators require CVs that highlight qualifications, registrations, and patient care experience clearly. CV Nest structures clinical experience in a format that works for NHS, private sector, and international roles.",
  },
  {
    emoji: "🎨",
    name: "Marketing & Creative",
    description:
      "Marketers, designers, content creators, and communications professionals need CVs that demonstrate both strategic thinking and creative execution. Our Modern and Bold templates balance visual appeal with ATS compatibility for agency and in-house roles alike.",
  },
  {
    emoji: "⚖️",
    name: "Legal & Compliance",
    description:
      "Solicitors, paralegals, compliance officers, and legal executives operate in a sector where precision and gravitas matter. The Executive and Classic templates convey the professionalism the legal world expects, with AI support for structuring complex case experience.",
  },
  {
    emoji: "🎓",
    name: "Education & Academia",
    description:
      "Teachers, lecturers, researchers, and education administrators need CVs that highlight qualifications, teaching experience, and — for academic roles — publications and research output. CV Nest handles these structured requirements clearly and professionally.",
  },
  {
    emoji: "🛍️",
    name: "Retail & Hospitality",
    description:
      "From store managers and buyers to chefs and hotel operations professionals, this sector rewards CVs that showcase customer experience outcomes, team leadership, and revenue contribution. Our AI transforms frontline service experience into compelling, achievement-led content.",
  },
  {
    emoji: "🔧",
    name: "Engineering & Manufacturing",
    description:
      "Civil, mechanical, electrical, and manufacturing engineers need CVs that communicate technical expertise alongside project delivery. CV Nest handles complex project descriptions and technical terminology with the precision and clarity engineering roles demand.",
  },
];

const IndustriesSection = () => {
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
            Built for every profession
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            CV Nest works for every industry and career stage
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Whether you're a software engineer in London, a nurse in Manchester, or a marketing
            manager looking for your next step — CV Nest has the templates, AI training, and
            formatting expertise to help you put your best foot forward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-orange-100 transition-colors"
            >
              <span className="text-3xl flex-shrink-0 mt-0.5" role="img" aria-label={industry.name}>
                {industry.emoji}
              </span>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{industry.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-slate-400 mt-10"
        >
          Don't see your industry listed? CV Nest works for every professional field —{" "}
          <a href="/builder" className="text-orange-500 hover:underline">
            try it for free
          </a>{" "}
          and see what it generates for your background.
        </motion.p>
      </div>
    </section>
  );
};

export default IndustriesSection;
