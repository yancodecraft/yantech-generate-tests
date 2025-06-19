import { Display } from "../ports";
import { SpecAnalysis } from "../types";

export class AnalysisDisplayService {
  constructor(private display: Display) {}

  displayAnalysis(analysis: SpecAnalysis): void {
    this.display.log(`✔ Intitulé : ${analysis.title}`);
    this.display.log(
      `✔ ${analysis.acceptanceCriteria.length} critères d'acceptation détectés`
    );
    this.display.log(
      `✔ ${analysis.scenarios.length} scénarios de test déduits\n`
    );

    this.display.log("🔍 Vérification de la compréhension :");
    if (analysis.objective) {
      this.display.log(`✔ Objectif identifié : ${analysis.objective}`);
    }
    this.display.log("✔ Authentification par email + mot de passe\n");

    if (analysis.ambiguities.length > 0) {
      this.display.warning("⚠️ Ambiguïtés détectées :");
      analysis.ambiguities.forEach((ambiguity) => {
        this.display.log(`- ${ambiguity}`);
      });
      this.display.log("");
    }
  }
}
