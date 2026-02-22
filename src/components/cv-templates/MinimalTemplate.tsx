import type { CVData } from "@/lib/cv-types";

const MinimalTemplate = ({ cvData }: { cvData: CVData }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-2xl font-light text-gray-900 tracking-wide">{cvData.name}</h3>
      <div className="h-0.5 w-8 bg-gray-300 mt-2 mb-1" />
      <p className="text-gray-500 text-sm">{cvData.title} · {cvData.email} · {cvData.location}</p>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{cvData.summary}</p>
    {cvData.experience?.length > 0 && (
      <div>
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-4">Experience</h4>
        <div className="space-y-5">
          {cvData.experience.map((exp, i) => (
            <div key={i}>
              <p className="font-medium text-gray-900 text-sm">{exp.role} — <span className="font-normal text-gray-600">{exp.company}</span></p>
              <p className="text-xs text-gray-400 mb-1">{exp.period}</p>
              <ul className="space-y-0.5 text-sm text-gray-600">
                {exp.bullets.map((b, j) => <li key={j} className="pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}
    {cvData.education?.length > 0 && (
      <div>
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-3">Education</h4>
        <div className="space-y-1">
          {cvData.education.map((edu, i) => (
            <p key={i} className="text-sm text-gray-600">{edu.degree}, {edu.institution} <span className="text-gray-400">({edu.year})</span></p>
          ))}
        </div>
      </div>
    )}
    {cvData.skills?.length > 0 && (
      <div>
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">Skills</h4>
        <p className="text-sm text-gray-600">{cvData.skills.join(", ")}</p>
      </div>
    )}
    {cvData.certifications?.length > 0 && (
      <div>
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">Certifications</h4>
        <p className="text-sm text-gray-600">
          {cvData.certifications
            .map((c) => (typeof c === 'string' ? c : `${c.title}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`))
            .join(", ")}
        </p>
      </div>
    )}    {cvData.customSections?.length > 0 && (
      <div>
        {cvData.customSections.map((section, i) => (
          <div key={i}>
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">{section.name}</h4>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    )}  </div>
);

export default MinimalTemplate;
