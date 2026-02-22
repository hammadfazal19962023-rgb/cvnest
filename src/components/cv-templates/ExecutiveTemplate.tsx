import type { CVData } from "@/lib/cv-types";

const ExecutiveTemplate = ({ cvData }: { cvData: CVData }) => (
  <div>
    <div className="-mx-8 md:-mx-12 -mt-8 md:-mt-12 bg-gray-900 text-white p-8 md:p-12 rounded-t-xl print:rounded-none">
      <h3 className="text-2xl font-bold">{cvData.name}</h3>
      <p className="text-amber-400 font-medium">{cvData.title}</p>
      <p className="text-sm text-gray-300 mt-1">{cvData.email} · {cvData.location}</p>
    </div>
    <div className="space-y-6 mt-6">
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Professional Summary</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{cvData.summary}</p>
      </div>
      {cvData.experience?.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Experience</h4>
          <div className="space-y-4">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="border-l-4 border-gray-900 pl-4">
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
              <div key={i} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{edu.degree}</p>
                  <p className="text-gray-500 text-sm">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {cvData.skills?.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((s) => (
              <span key={s} className="px-3 py-1 bg-gray-900 text-white rounded text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}
      {cvData.certifications?.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Certifications</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {cvData.certifications.map((c, i) => (
              <li key={i}>• {typeof c === 'string' ? c : `${c.title}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`}</li>
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
  </div>
);

export default ExecutiveTemplate;
