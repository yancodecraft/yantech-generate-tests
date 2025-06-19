import { SpecAnalysis } from "../types";

export interface TestGeneration {
  generate(analysis: SpecAnalysis): Promise<string>;
  save(generatedCode: string, specPath: string): Promise<string>;
}
