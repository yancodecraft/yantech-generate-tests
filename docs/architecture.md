# Architecture Hexagonale

Ce projet suit une architecture hexagonale (Clean Architecture) pour séparer la logique métier des détails techniques.

## Structure

```
src/
├── core/                    # Logique métier pure (pas de dépendances externes)
│   ├── useCase/            # Cas d'usage métier
│   │   └── AnalyseAndGenerateTestsFromSpec.ts
│   └── index.ts
├── adapters/               # Adaptateurs pour les dépendances externes
│   ├── FileSystemAdapter.ts
│   ├── SpecAnalyzerAdapter.ts
│   ├── TestGeneratorAdapter.ts
│   └── index.ts
├── commands/               # Interface utilisateur (CLI)
│   └── generate.ts
└── main.ts                 # Point d'entrée
```

## Principe

### Core (Domaine)

- Contient uniquement du code TypeScript pur
- Aucune dépendance vers des packages externes (fs, openai, etc.)
- Définit les interfaces (ports) que les adaptateurs doivent implémenter
- Contient la logique métier dans les use cases

### Adaptateurs

- Implémentent les interfaces définies dans le core
- Gèrent les interactions avec les systèmes externes (fichiers, API OpenAI, etc.)
- Peuvent être facilement remplacés ou testés

### Avantages

1. **Testabilité** : Le core peut être testé sans dépendances externes
2. **Flexibilité** : Les adaptateurs peuvent être changés sans modifier le core
3. **Séparation des responsabilités** : Logique métier séparée des détails techniques
4. **Maintenabilité** : Code plus facile à comprendre et maintenir

## Use Case : AnalyseAndGenerateTestsFromSpec

Ce use case orchestre le processus complet de génération de tests :

1. **Validation** : Vérifie que le chemin de la spécification est valide
2. **Lecture** : Lit le contenu du fichier de spécification
3. **Analyse** : Analyse la spécification pour extraire les informations
4. **Génération** : Génère le code de test
5. **Sauvegarde** : Sauvegarde le fichier de test généré

## Ports (Interfaces)

### SpecAnalyzerPort

```typescript
interface SpecAnalyzerPort {
  analyze(specContent: string): Promise<SpecAnalysis>;
}
```

### TestGeneratorPort

```typescript
interface TestGeneratorPort {
  generate(analysis: SpecAnalysis): Promise<string>;
  save(generatedCode: string, specPath: string): Promise<string>;
}
```

### FileSystemPort

```typescript
interface FileSystemPort {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  exists(path: string): Promise<boolean>;
  createDirectory(path: string): Promise<void>;
}
```

## Utilisation

```typescript
// Créer les adaptateurs
const fileSystem = new FileSystemAdapter();
const specAnalyzer = new SpecAnalyzerAdapter();
const testGenerator = new TestGeneratorAdapter();

// Créer le use case
const useCase = new AnalyseAndGenerateTestsFromSpec(
  specAnalyzer,
  testGenerator,
  fileSystem
);

// Exécuter
const result = await useCase.execute(specPath);
```
