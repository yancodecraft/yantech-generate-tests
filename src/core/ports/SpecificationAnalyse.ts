import { SpecAnalysis } from "../types";

export interface SpecificationAnalyse {
  analyze(specContent: string): Promise<SpecAnalysis>;
}
