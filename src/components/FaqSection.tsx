import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// SEO-optimized FAQs with relevant keywords
const faqs = [
    {
        question: "How does the AI CV generator work?",
        answer: "Our AI CV generator works like your personal resume assistant! Simply upload your LinkedIn profile (we extract everything automatically) or enter your details manually. Our AI then analyzes your experience, suggests powerful bullet points using action verbs, optimizes for ATS (Applicant Tracking Systems), and formats everything into a professional template. You can edit anything, then download as PDF instantly. No robots taking over the world, promise! 🤖❤️",
        keywords: ["AI CV generator", "how it works", "resume builder", "automatic resume creation"]
    },
    {
        question: "Can I really create a resume from LinkedIn for free?",
        answer: "Absolutely! Our LinkedIn to PDF resume converter is 100% free. Just click 'Import from LinkedIn', and within seconds, your work history, education, and skills are transformed into a beautifully formatted CV. No manual copying and pasting, no hidden costs, no premium version required. It's the fastest way to update your resume!",
        keywords: ["LinkedIn to PDF", "LinkedIn resume converter", "free resume builder", "import LinkedIn to CV"]
    },
    // {
    //     question: "Is this resume builder actually free? Like, forever free?",
    //     answer: "100% free forever! No hidden fees, no 'premium' features locked behind paywalls, no credit card required. We believe everyone deserves a great resume without having to pay. All our templates, AI features, and PDF downloads are completely free. If we ever add anything (which we probably won't), we'll throw a party and tell everyone first. 🎉",
    //     keywords: ["free resume builder", "no cost CV maker", "free AI resume generator", "no paywall"]
    // },
    {
        question: "Can I download my resume as a PDF?",
        answer: "Yes! You can download your professionally formatted CV as a high-quality PDF with just one click. PDF is the universal standard for job applications and ensures your formatting stays perfect across all devices and platforms. Whether you're applying through email, job portals, or printing copies, PDF gives you that polished, professional look every time. No more formatting issues when recruiters open your resume! 📄",
        keywords: ["download PDF resume", "PDF CV", "resume PDF download", "export as PDF"]
    },
    {
        question: "Are your templates ATS-friendly? Will robots reject my resume?",
        answer: "Yes! All our templates are optimized for Applicant Tracking Systems (ATS). Our AI ensures your resume has clean, parseable formatting, standard section headings, and keyword optimization based on your industry. We've designed them to pass robot screening while still looking great for human recruiters. No fancy columns or graphics that confuse the bots!",
        keywords: ["ATS-friendly resume", "ATS resume template", "robot-proof CV", "applicant tracking system"]
    },
    {
        question: "How long does it take to create a professional CV?",
        answer: "With LinkedIn import: about 30 seconds. With manual entry: maybe 10-15 minutes if you're sipping coffee. Our AI CV generator is built for speed – just select a template, add your info, and download your PDF. No design skills, no formatting struggles, no hours wasted. Perfect for last-minute job applications! ⚡",
        keywords: ["quick resume builder", "fast CV creation", "instant resume download", "save time"]
    },
    {
        question: "What if my LinkedIn profile is outdated or messy?",
        answer: "First of all, same! 😅 Our AI is trained to work with whatever you have. It'll clean up formatting, fix inconsistent dates, identify gaps, and help you fill in missing information. You can edit everything after import – add missing roles, update descriptions, or remove outdated info. Think of it as a LinkedIn makeover for your resume!",
        keywords: ["update LinkedIn resume", "fix resume", "edit CV", "resume improvement"]
    },
    {
        question: "Can I customize the AI-generated content?",
        answer: "Absolutely! The AI suggests powerful bullet points, but you're in complete control. You can edit every section, add your own achievements, change the wording, or reorder things however you want. Our real-time editor shows changes instantly, and you can download an updated PDF with one click. It's your resume – you're the boss!",
        keywords: ["edit AI resume", "customize CV", "resume editor", "personalize template"]
    },
    {
        question: "Do I need design skills to use the CV templates?",
        answer: "Zero design skills needed! Our templates are professionally designed and automatically format your content. Just pick a style you like – Modern, Classic, Creative, Minimal, Executive, or Tech – and our AI does the rest. No struggling with margins, fonts, or layouts. Just beautiful, consistent formatting every time.",
        keywords: ["resume templates", "CV designs", "professional layout", "easy formatting"]
    },
    {
        question: "Is my data secure when I upload my LinkedIn profile?",
        answer: "Your privacy is our priority. We only access the information you authorize and never store your LinkedIn password. All data is encrypted, and you can delete your resume anytime. We don't share your information with third parties, and we're transparent about everything we do. Read our privacy policy for details! 🔒",
        keywords: ["secure resume builder", "privacy", "data protection", "safe CV creator"]
    },
    {
        question: "Can I create multiple versions of my resume?",
        answer: "Yes! You can create different versions of your CV tailored to specific jobs. Save multiple drafts, customize bullet points for different industries, or create a master resume and export variations. Perfect for applying to different roles without starting from scratch each time.",
        keywords: ["multiple resume versions", "customize for job", "tailor CV", "different resume formats"]
    },
    {
        question: "What makes this the best free AI resume generator?",
        answer: "Unlike other 'free' tools that hide features behind paywalls, we're genuinely free. You get: unlimited LinkedIn imports, all templates, AI-powered suggestions, multiple format downloads (PDF, Word, TXT), real-time editing, and no watermarks. Plus our AI is trained on thousands of successful resumes to give you the best suggestions. Try it and see the difference!",
        keywords: ["best free resume builder", "AI resume generator comparison", "top CV maker", "free alternative"]
    }
];

const FaqSection = () => {
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // Optional: Show only first 6 FAQs, with a "View More" button
    const visibleFaqs = faqs; // or faqs.slice(0, 6) if you want to limit

    return (
        <div className="py-16 bg-white/30 backdrop-blur-sm">
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Everything you need to know about our AI CV generator
                        </p>
                    </motion.div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {visibleFaqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                faq={faq}
                                index={index}
                                isExpanded={expandedFaq === index}
                                onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            />
                        ))}
                    </div>

                    {/* Still Have Questions CTA */}
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-8 bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-6"
                    >
                        <MessageCircle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                        <p className="text-slate-700 mb-2">Still have questions about our AI resume builder?</p>
                        <Button
                            variant="link"
                            className="text-orange-600 hover:text-orange-700"
                            onClick={() => navigate("/contact")}
                        >
                            Chat with our team <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </motion.div> */}
                </div>
            </div>
        </div>
    );
};

// Individual FAQ Item Component
const FaqItem = ({
    faq,
    index,
    isExpanded,
    onToggle
}: {
    faq: typeof faqs[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-orange-200 transition-colors"
            itemScope
            itemType="https://schema.org/Question"
        >
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 text-left flex items-center justify-between group"
                aria-expanded={isExpanded}
            >
                <span className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors" itemProp="name">
                    {faq.question}
                </span>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                )}
            </button>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-slate-600 border-t-2 border-slate-100 pt-4"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                >
                    <div itemProp="text">
                        {faq.answer}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default FaqSection;