import type { CVData } from "@/lib/cv-types";

const ClassicTemplate = ({ cvData }: { cvData: CVData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>{cvData.name}</h3>
      <p className="text-gray-600 font-medium">{cvData.title}</p>
      <p className="text-sm text-gray-500 mt-1">{cvData.email} · {cvData.location}</p>
    </div>
    <div className="border-t border-gray-300" />
    <div>
      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>Professional Summary</h4>
      <p className="text-gray-600 text-sm leading-relaxed text-center">{cvData.summary}</p>
    </div>
    <div className="border-t border-gray-200" />
    {cvData.experience?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 text-center" style={{ fontFamily: "Georgia, serif" }}>Experience</h4>
        <div className="space-y-4">
          {cvData.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 text-sm" style={{ fontFamily: "Georgia, serif" }}>{exp.role}</p>
                  <p className="text-gray-600 text-sm italic">{exp.company}</p>
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
    <div className="border-t border-gray-200" />
    {cvData.education?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>Education</h4>
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
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>Skills</h4>
        <p className="text-sm text-gray-600 text-center">{cvData.skills.join(" · ")}</p>
      </div>
    )}
    {cvData.certifications?.length > 0 && (
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>Certifications</h4>
        <ul className="space-y-1 text-sm text-gray-600 text-center">
          {cvData.certifications.map((c, i) => (
            <li key={i}>
              {typeof c === 'string' ? c : `${c.title}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`}
            </li>
          ))}
        </ul>
      </div>
    )}
    {cvData.customSections?.length > 0 && (
      <div>
        <div className="border-t border-gray-200" />
        {cvData.customSections.map((section, i) => (
          <div key={i} className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>{section.name}</h4>
            <p className="text-gray-600 text-sm leading-relaxed text-center">{section.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ClassicTemplate;
