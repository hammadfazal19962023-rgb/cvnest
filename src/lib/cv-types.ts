export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  date?: string;
}

export interface CustomSection {
  id: string;
  name: string;
  description: string;
  entries?: Array<{
    [key: string]: string | string[];
  }>;
}

export interface SectionOrder {
  id: string;
  name: string;
  order: number;
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  certifications: CertificationEntry[];
  customSections?: CustomSection[];
  sectionOrder?: SectionOrder[];
}
