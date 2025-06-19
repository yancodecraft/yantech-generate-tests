"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisDisplayService = void 0;
class AnalysisDisplayService {
    constructor(display) {
        this.display = display;
    }
    displayAnalysis(analysis) {
        this.display.log(`✔ Intitulé : ${analysis.title}`);
        this.display.log(`✔ ${analysis.acceptanceCriteria.length} critères d'acceptation détectés`);
        this.display.log(`✔ ${analysis.scenarios.length} scénarios de test déduits\n`);
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
exports.AnalysisDisplayService = AnalysisDisplayService;
