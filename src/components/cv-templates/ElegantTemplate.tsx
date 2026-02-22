import type { CVData } from "@/lib/cv-types";

const ElegantTemplate = ({ cvData }: { cvData: CVData }) => (
  <div className="space-y-6">
    <div className="border-b-2 border-rose-300 pb-4">
      <h3 className="text-3xl font-light text-gray-800 tracking-wide">{cvData.name}</h3>
      <p className="text-rose-500 font-medium mt-1">{cvData.title}</p>
      <p className="text-sm text-gray-400 mt-1">{cvData.email} · {cvData.location}</p>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed italic border-l-2 border-rose-200 pl-4">{cvData.summary}</p>
    {cvData.experience?.length > 0 && (
      <div>
        <h4 className="text-xs font-semibold text-rose-500 uppercase tracking-[0.15em] mb-3">Experience</h4>
        <div className="space-y-4">
          {cvData.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-gray-800 text-sm">{exp.role}</p>
                <span className="text-xs text-gray-400 ml-4">{exp.period}</span>
              </div>
              <p className="text-rose-400 text-sm">{exp.company}</p>
              <ul className="mt-1 space-y-0.5 text-sm text-gray-600">
                {exp.bullets.map((b, j) => <li key={j}>— {b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}
    {cvData.education?.length > 0 && (
      <div>
        <h4 className="text-xs font-semibold text-rose-500 uppercase tracking-[0.15em] mb-2">Education</h4>
        {cvData.education.map((edu, i) => (
          <p key={i} className="text-sm text-gray-600">{edu.degree}, <span className="text-gray-400">{edu.institution} ({edu.year})</span></p>
        ))}
      </div>
    )}
    {cvData.skills?.length > 0 && (
      <div>
        <h4 className="text-xs font-semibold text-rose-500 uppercase tracking-[0.15em] mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((s) => (
            <span key={s} className="px-3 py-1 border border-rose-200 text-gray-600 rounded-full text-xs">{s}</span>
          ))}
        </div>
      </div>
    )}
    {cvData.certifications?.length > 0 && (
      <div>
        <h4 className="text-xs font-semibold text-rose-500 uppercase tracking-[0.15em] mb-2">Certifications</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          {cvData.certifications.map((c, i) => (
            <li key={i}>— {typeof c === 'string' ? c : `${c.title}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`}</li>
          ))}
        </ul>
      </div>
    )}
    {cvData.customSections?.length > 0 && (
      <div>
        {cvData.customSections.map((section, i) => (
          <div key={i}>
            <h4 className="text-xs font-semibold text-rose-500 uppercase tracking-[0.15em] mb-2">{section.name}</h4>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ElegantTemplate;
