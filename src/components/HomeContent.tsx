import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

const HomeContent: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="bg-white/90 backdrop-blur-sm border border-orange-100 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
              How to Create a Strong CV — Practical Tips
            </h2>
            <p className="text-gray-700 mb-4">
              A great CV is more than a list of jobs. It tells a clear story about your
              experience, impact and potential. Below are practical, actionable tips you
              can apply immediately to make your CV stand out to recruiters and applicant
              tracking systems (ATS).
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold">Focus on impact, not tasks</h3>
                <p className="text-sm">Use short bullets that explain outcomes and quantify results when possible.</p>
              </div>

              <div>
                <h3 className="font-semibold">Tailor for the role</h3>
                <p className="text-sm">Highlight experiences and keywords that match the job description.</p>
              </div>

              <div>
                <h3 className="font-semibold">Keep structure clear</h3>
                <p className="text-sm">Use consistent sections, bold role titles and readable bullets for quick scanning.</p>
              </div>

              <div>
                <h3 className="font-semibold">Optimize for ATS</h3>
                <p className="text-sm">Avoid complex layouts and put key information in plain text.</p>
              </div>
            </div>

            <div className="mt-6">
              <a href="/builder" className="inline-block">
                <Button  className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
                  Build Your CV
                </Button>
              </a>
            </div>
          </div>

          <aside className="rounded-2xl p-6 bg-white/95 border border-orange-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h4 className="text-lg font-bold">Quick Checklist</h4>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1" />
                <span className="text-sm">One page for early-career; two pages if necessary</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1" />
                <span className="text-sm">Start bullets with action verbs</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1" />
                <span className="text-sm">Include contact details and portfolio links</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1" />
                <span className="text-sm">Proofread thoroughly and be honest</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
