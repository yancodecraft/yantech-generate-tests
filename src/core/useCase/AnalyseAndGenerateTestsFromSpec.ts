import {
  Display,
  FileSystem,
  SpecificationAnalyse,
  TestGeneration,
} from "../ports";
import { AnalysisDisplayService } from "../services";
import { TestGenerationResult } from "../types";

export class AnalyseAndGenerateTestsFromSpec {
  private analysisDisplayService: AnalysisDisplayService;

  constructor(
    private specAnalyzer: SpecificationAnalyse,
    private testGenerator: TestGeneration,
    private fileSystem: FileSystem,
    private display: Display
  ) {
    this.analysisDisplayService = new AnalysisDisplayService(display);
  }

  async execute(specPath: string): Promise<TestGenerationResult> {
    // 1. Valider le chemin de la spécification
    this.validateSpecPath(specPath);

    // 2. Lire le contenu de la spécification
    const specContent = await this.fileSystem.readFile(specPath);

    // 3. Analyser la spécification
    const analysis = await this.specAnalyzer.analyze(specContent);

    // 4. Afficher l'analyse
    this.analysisDisplayService.displayAnalysis(analysis);

    // 5. Générer les tests
    const generatedCode = await this.testGenerator.generate(analysis);

    // 6. Sauvegarder les tests
    const testFilePath = await this.testGenerator.save(generatedCode, specPath);

    return {
      generatedCode,
      testFilePath,
    };
  }

  private validateSpecPath(specPath: string): void {
    if (!specPath || specPath.trim() === "") {
      throw new Error("Le chemin vers la spécification est requis");
    }
  }
}
