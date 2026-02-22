import type { CVData } from "@/lib/cv-types";
import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import CreativeTemplate from "./CreativeTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import TechTemplate from "./TechTemplate";
import ElegantTemplate from "./ElegantTemplate";
import BoldTemplate from "./BoldTemplate";

const templateMap: Record<string, React.FC<{ cvData: CVData }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  techie: TechTemplate,
  elegant: ElegantTemplate,
  bold: BoldTemplate,
};

export const renderCVTemplate = (template: string, cvData: CVData) => {
  const Component = templateMap[template] || ModernTemplate;
  return <Component cvData={cvData} />;
};
