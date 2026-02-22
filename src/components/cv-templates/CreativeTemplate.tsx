import type { CVData } from "@/lib/cv-types";

const CreativeTemplate = ({ cvData }: { cvData: CVData }) => (
  <div className="flex gap-6">
    {/* Sidebar */}
    <div className="w-1/3 bg-gray-50 rounded-lg p-5 space-y-5">
      <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center text-white text-xl font-bold">
        {cvData.name?.charAt(0)}
      </div>
      <div className="text-center">
        <p className="font-bold text-gray-900 text-sm">{cvData.name}</p>
        <p className="text-amber-600 text-xs">{cvData.title}</p>
      </div>
      <div className="space-y-2 text-xs text-gray-600">
        <p>✉ {cvData.email}</p>
        <p>📍 {cvData.location}</p>
      </div>
      {cvData.skills?.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((s) => (
              <span key={s} className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}
      {cvData.certifications?.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Certifications</h4>
          <ul className="space-y-1 text-xs text-gray-600">
            {cvData.certifications.map((c, i) => (
              <li key={i}>• {typeof c === 'string' ? c : `${c.title}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    {/* Main */}
    <div className="flex-1 space-y-5">
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">About</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{cvData.summary}</p>
      </div>
      {cvData.experience?.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Experience</h4>
          <div className="space-y-4">
            {cvData.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{exp.role}</p>
                    <p className="text-amber-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{exp.period}</span>
                </div>
                <ul className="mt-1.5 space-y-1 text-sm text-gray-600">
                  {exp.bullets.map((b, j) => <li key={j}>• {b}</li>)}
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
              <div key={i}>
                <p className="font-semibold text-gray-900 text-sm">{edu.degree}</p>
                <p className="text-gray-500 text-sm">{edu.institution} · {edu.year}</p>
              </div>
            ))}
          </div>
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
  </div>
);

export default CreativeTemplate;
