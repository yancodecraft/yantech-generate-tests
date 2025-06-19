import {
  DisplayAdapter,
  FileSystemAdapter,
  OpenAIChatCompletionAdapter,
  SpecAnalyzerAdapter,
  TestGeneratorAdapter,
} from "../adapters";
import { AnalyseAndGenerateTestsFromSpec } from "../core/useCase/AnalyseAndGenerateTestsFromSpec";

export function generateTestsFromSpec(specPath: string) {
  try {
    console.log(`🧪 Analyse de la spec : ${specPath}\n`);

    // Créer l'adaptateur ChatCompletion
    const chatCompletion = new OpenAIChatCompletionAdapter();

    // Créer les adaptateurs
    const fileSystem = new FileSystemAdapter();
    const specAnalyzer = new SpecAnalyzerAdapter(chatCompletion);
    const testGenerator = new TestGeneratorAdapter(chatCompletion);
    const display = new DisplayAdapter();

    // Créer le use case
    const useCase = new AnalyseAndGenerateTestsFromSpec(
      specAnalyzer,
      testGenerator,
      fileSystem,
      display
    );

    // Exécuter le use case
    useCase
      .execute(specPath)
      .then(async (result) => {
        // Afficher les résultats
        console.log(result.testFilePath);
      })
      .catch((error) => {
        console.error(error.message);
        process.exit(1);
      });
  } catch (error) {
    console.error(`Erreur lors de l'initialisation : ${error}`);
    process.exit(1);
  }
}
