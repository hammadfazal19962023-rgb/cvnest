import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    initials: "JT",
    name: "James T.",
    role: "Software Engineer",
    location: "London",
    color: "bg-blue-100 text-blue-700",
    quote:
      "I'd been sending the same CV out for months and getting nothing back. I used CV Nest, pasted in the job description for a role I really wanted, and the AI completely rewrote my bullet points. I got a call back within two days. The difference was night and day — it turned my list of duties into actual achievements with numbers I'd completely forgotten to include.",
  },
  {
    initials: "PK",
    name: "Priya K.",
    role: "Marketing Manager",
    location: "Manchester",
    color: "bg-pink-100 text-pink-700",
    quote:
      "I was changing roles after seven years at the same company and had no idea how to update my CV. The LinkedIn import feature pulled everything in automatically, and then the AI tailored it to the specific role I was going for. What I loved most was that I could edit everything — it wasn't just a black box. I felt in control the whole time.",
  },
  {
    initials: "OR",
    name: "Oliver R.",
    role: "Recent Graduate",
    location: "Bristol",
    color: "bg-green-100 text-green-700",
    quote:
      "I graduated in June and had almost no idea what to put on my CV. I'd done a placement year and some part-time work, but I didn't know how to present it. CV Nest turned my vague descriptions into really strong bullet points and helped me write a professional summary that actually sounded confident. I used the Modern template and had three interviews in my first two weeks of applying.",
  },
  {
    initials: "FN",
    name: "Fatima N.",
    role: "HR Business Partner",
    location: "Birmingham",
    color: "bg-purple-100 text-purple-700",
    quote:
      "As someone who works in HR, I know exactly what makes a good CV — and I was still procrastinating writing my own for months. CV Nest made the whole process painless. I imported my LinkedIn, let the AI do a first pass, then spent about 20 minutes editing. The ATS score feature is genuinely useful and something I'd recommend to every job seeker I work with.",
  },
  {
    initials: "DM",
    name: "David M.",
    role: "Project Manager",
    location: "Edinburgh",
    color: "bg-amber-100 text-amber-700",
    quote:
      "I was sceptical about free tools — I'd tried a few and the output was always generic and a bit embarrassing. CV Nest was completely different. The AI asked me questions through the interface, the language was specific and professional, and the Executive template looked genuinely impressive. I showed it to a colleague who has years of recruitment experience and she asked which agency had written it.",
  },
  {
    initials: "AC",
    name: "Amelia C.",
    role: "Nurse",
    location: "Leeds",
    color: "bg-teal-100 text-teal-700",
    quote:
      "Healthcare CVs have very specific requirements and I was worried a general AI tool wouldn't understand them. But CV Nest handled my clinical experience really well — the terminology was right, the structure made sense for NHS applications, and the Classic template looked clean and professional. I updated my CV in about 15 minutes and used it to apply for a band 7 post I'd been putting off.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
            What people are saying
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            Real stories from real job seekers
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Thousands of people have used CV Nest to update their CVs, change careers, and land jobs
            they're proud of. Here's what some of them have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-orange-200 mb-3 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-400 mt-8"
        >
          Testimonials represent real user experiences. Names and some identifying details may have been
          adjusted for privacy.
        </motion.p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
