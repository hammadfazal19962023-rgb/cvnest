import type { CVData } from "@/lib/cv-types";

const TechTemplate = ({ cvData }: { cvData: CVData }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
        {cvData.name?.charAt(0)}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{cvData.name}</h3>
        <p className="text-indigo-600 text-sm font-medium">{cvData.title}</p>
      </div>
    </div>
    <p className="text-sm text-gray-500">{cvData.email} · {cvData.location}</p>
    {cvData.skills?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-1.5">
          {cvData.skills.map((s) => (
            <span key={s} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-mono font-medium border border-indigo-200">{s}</span>
          ))}
        </div>
      </div>
    )}
    <div>
      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Summary</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{cvData.summary}</p>
    </div>
    {cvData.experience?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Experience</h4>
        <div className="space-y-4">
          {cvData.experience.map((exp, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{exp.role}</p>
                  <p className="text-indigo-600 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4 font-mono">{exp.period}</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {exp.bullets.map((b, j) => <li key={j} className="flex gap-2"><span className="text-indigo-400">▸</span>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}
    {cvData.education?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Education</h4>
        <div className="space-y-2">
          {cvData.education.map((edu, i) => (
            <p key={i} className="text-sm text-gray-600">{edu.degree} — {edu.institution} <span className="text-gray-400 font-mono">({edu.year})</span></p>
          ))}
        </div>
      </div>
    )}
    {cvData.certifications?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Certifications</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          {cvData.certifications.map((c, i) => (
            <li key={i}>▸ {typeof c === 'string' ? c : `${c.title}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`}</li>
          ))}
        </ul>
      </div>
    )}
    {cvData.customSections?.length > 0 && (
      <div>
        {cvData.customSections.map((section, i) => (
          <div key={i}>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">{section.name}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default TechTemplate;
