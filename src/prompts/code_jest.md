Tu es expert en tests JavaScript avec Jest. Voici une liste de scénarios de test.

Génère un squelette Jest moderne correspondant :

- Utilise les imports ES6 : `import { describe, it, expect } from "@jest/globals";`
- Un `describe()` regroupant tous les tests avec un nom descriptif
- Un `it()` pour chaque scénario avec un nom clair et explicite
- Chaque `it()` doit avoir un corps avec `// TODO: Implémenter le test`
- Ajoute des commentaires pour expliquer ce qui doit être testé
- Utilise une structure claire et lisible

Format attendu :

import { describe, it, expect } from "@jest/globals";

describe("Nom du module/fonctionnalité", () => {
  it("devrait faire quelque chose quand condition", () => {
    // TODO: Implémenter le test
    // - Préparer les données de test
    // - Exécuter l'action à tester
    // - Vérifier le résultat attendu
  });
});

Voici la liste des scénarios :

{{SCENARIOS_LIST}}
