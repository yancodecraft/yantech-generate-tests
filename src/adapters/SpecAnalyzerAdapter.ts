import * as fs from "fs";
import { ChatCompletion, SpecificationAnalyse } from "../core/ports";
import { SpecAnalysis } from "../core/types";

export class SpecAnalyzerAdapter implements SpecificationAnalyse {
  private chatCompletion: ChatCompletion;

  constructor(chatCompletion: ChatCompletion) {
    this.chatCompletion = chatCompletion;
  }

  async analyze(specContent: string): Promise<SpecAnalysis> {
    try {
      // Lire le prompt d'analyse
      const promptTemplate = fs.readFileSync("src/prompts/analyse.md", "utf-8");

      // Remplacer le placeholder par le contenu de la spécification
      const prompt = promptTemplate.replace("{{SPEC_CONTENT}}", specContent);

      // Appeler l'API de chat completion
      const response = await this.chatCompletion.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en analyse de spécifications fonctionnelles et en génération de tests. Tu réponds toujours au format JSON demandé.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      });

      const analysisText = response.content;

      if (!analysisText) {
        throw new Error("Aucune réponse reçue d'OpenAI");
      }

      // Parser la réponse JSON
      return this.parseAnalysisResponse(analysisText);
    } catch (error) {
      console.error("Erreur lors de l'analyse avec OpenAI:", error);
      throw error;
    }
  }

  private parseAnalysisResponse(response: string): SpecAnalysis {
    try {
      // Parser directement le JSON (GPT-4o garantit un JSON valide avec response_format)
      const parsed = JSON.parse(response.trim());

      // Valider et retourner l'analyse
      return {
        title: parsed.title || "",
        objective: parsed.objective || "",
        acceptanceCriteria: Array.isArray(parsed.acceptanceCriteria)
          ? parsed.acceptanceCriteria
          : [],
        scenarios: Array.isArray(parsed.scenarios) ? parsed.scenarios : [],
        ambiguities: Array.isArray(parsed.ambiguities)
          ? parsed.ambiguities
          : [],
      };
    } catch (error) {
      console.error("Erreur lors du parsing JSON:", error);
      console.error("Réponse reçue:", response);

      // Retourner une analyse vide en cas d'erreur
      return {
        title: "",
        objective: "",
        acceptanceCriteria: [],
        scenarios: [],
        ambiguities: [],
      };
    }
  }
}
