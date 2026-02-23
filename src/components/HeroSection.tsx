import { motion } from "framer-motion";
import { ArrowRight, FileText, Rocket, Smile, Coffee, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

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
    </section>
  );
};

export default HeroSection;