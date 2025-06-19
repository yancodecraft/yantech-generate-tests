import * as fs from "fs";
import { ChatCompletion, TestGeneration } from "../core/ports";
import { SpecAnalysis } from "../core/types";

export class TestGeneratorAdapter implements TestGeneration {
  private chatCompletion: ChatCompletion;

  constructor(chatCompletion: ChatCompletion) {
    this.chatCompletion = chatCompletion;
  }

  async generate(analysis: SpecAnalysis): Promise<string> {
    try {
      // Lire le prompt template
      const promptTemplate = fs.readFileSync(
        "src/prompts/code_jest.md",
        "utf-8"
      );

      // Préparer la liste des scénarios pour le prompt
      const scenariosList = analysis.scenarios
        .map((scenario, index) => `${index + 1}. ${scenario}`)
        .join("\n");

      // Remplacer le placeholder dans le prompt
      const prompt = promptTemplate.replace(
        "{{SCENARIOS_LIST}}",
        scenariosList
      );

      console.log("🤖 Génération des tests Jest avec OpenAI...\n");

      // Appeler l'API de chat completion
      const response = await this.chatCompletion.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en tests JavaScript avec Jest. Génère UNIQUEMENT du code JavaScript pur sans balises markdown, sans ```javascript ou ```, sans explications. Utilise toujours 'import { describe, it, expect } from @jest/globals' et structure le code de manière claire et lisible. Ne mets jamais de balises de code autour de ta réponse.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const generatedCode = response.content;

      if (!generatedCode) {
        throw new Error("Aucun code généré par OpenAI");
      }

      // Nettoyer le code généré pour supprimer les balises markdown
      const cleanedCode = this.cleanGeneratedCode(generatedCode);

      return cleanedCode;
    } catch (error) {
      throw new Error(`Erreur lors de la génération des tests Jest : ${error}`);
    }
  }

  async save(generatedCode: string, specPath: string): Promise<string> {
    try {
      // Déterminer le nom du fichier de test basé sur le chemin de la spec
      const specName = specPath.split("/").pop()?.replace(".md", "") || "test";
      const testFileName = `${specName}.test.js`;
      const testFilePath = `specs/${testFileName}`;

      // Créer le dossier specs s'il n'existe pas
      if (!fs.existsSync("specs")) {
        fs.mkdirSync("specs", { recursive: true });
      }

      // Écrire le fichier de test
      fs.writeFileSync(testFilePath, generatedCode, "utf-8");

      console.log(
        `✅ Tests Jest générés et sauvegardés dans : ${testFilePath}\n`
      );

      return testFilePath;
    } catch (error) {
      throw new Error(`Erreur lors de la sauvegarde des tests : ${error}`);
    }
  }

  private cleanGeneratedCode(code: string): string {
    // Supprimer les balises markdown de code
    let cleaned = code
      .replace(/```javascript\s*/gi, "")
      .replace(/```js\s*/gi, "")
      .replace(/```\s*$/gi, "")
      .replace(/^\s*```\s*/gi, "")
      .trim();

    // S'assurer que le code commence par un import
    if (!cleaned.startsWith("import")) {
      // Chercher la première ligne d'import
      const importMatch = cleaned.match(/import\s+.*?from\s+['"][^'"]+['"];?/);
      if (importMatch) {
        const importIndex = cleaned.indexOf(importMatch[0]);
        cleaned = cleaned.substring(importIndex);
      }
    }

    return cleaned;
  }
}
