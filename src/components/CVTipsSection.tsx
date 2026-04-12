import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tips = [
  {
    number: "01",
    heading: "Lead every bullet point with a strong action verb",
    body: "The first word of each bullet point sets the tone for everything that follows. 'Managed', 'Built', 'Led', 'Grew', 'Reduced', 'Launched' — these words signal agency and ownership. Weak openers like 'Responsible for' or 'Helped with' undercut even strong achievements. Go through every bullet on your current CV and replace weak openers with specific, active verbs.",
  },
  {
    number: "02",
    heading: "Quantify your impact wherever you can",
    body: "Numbers make achievements credible and memorable. 'Increased sales' is forgettable. 'Grew quarterly sales revenue from £180,000 to £290,000 over eight months by expanding the team's outreach strategy' is not. For every role, ask yourself: how many? by how much? over what time period? to what value? Even rough estimates — 'approximately 150 clients', 'a team of around 12' — are more compelling than vague language.",
  },
  {
    number: "03",
    heading: "Tailor your CV for every application",
    body: "A single generic CV sent to every employer is one of the most common and costly mistakes in job searching. The 20 minutes you spend tailoring your CV for each application — adjusting your summary, mirroring the job description's language, reordering your most relevant experience to the top — consistently produces more responses than sending a polished but generic document to twice as many jobs.",
  },
  {
    number: "04",
    heading: "Keep formatting clean and ATS-compatible",
    body: "The most beautifully designed CV in the world is useless if the Applicant Tracking System can't read it. Avoid multi-column layouts, tables, text boxes, images, and unusual fonts. Stick to standard section headings — 'Experience', 'Education', 'Skills' — not creative alternatives. A single-column document in a clean, standard font will outperform a visually complex one in most online application processes.",
  },
];

const CVTipsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
            Free CV advice
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            Four things that immediately improve any CV
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            You don't need a professional CV writer to produce a great CV. You need to understand
            what recruiters and ATS systems are looking for — and then apply it consistently. Start
            with these four principles.
          </p>
        </motion.div>

        <div className="space-y-6">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 p-6 md:p-8 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-100"
            >
              <span className="text-4xl font-black text-orange-200 leading-none flex-shrink-0 select-none">
                {tip.number}
              </span>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-2">{tip.heading}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tip.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-slate-600 mb-4">
            Want more in-depth CV advice? Our blog covers everything from ATS optimisation to
            writing CVs for career changes.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
          >
            Read the CV Nest blog
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CVTipsSection;
