# Étape 1 : Mettre en place le projet CLI

Pourquoi un outil CLI (et pas une app web, par exemple) ?
• Rapidité de prototypage : pas besoin de front-end pour tester la logique métier.
• Ciblage des développeurs : les utilisateurs initiaux sont à l’aise en ligne de commande.
• Facilité de diffusion : publication via npm, et plus tard via Homebrew.
• Maintenabilité : testable, versionnable, extensible facilement.

## Initialisation du projet

**Initialisation du projet Node.js**

`npm init -y`

**Créer un fichier `.gitignore`**

```
node_modules
bin/
```

**Développement avec Typescript**

`npm install --save-dev typescript @types/node`

**Initialiser typescript**

`npx tsc --init`

**Configurer `tsconfig.json`**

```json
    ...
    "rootDirs": [
      "./src"
    ],
    "outDir": "./bin"
    ...
```

- `rootDirs` répertoire où se trouve les fichiers sources
- `outDir` répertoire de sortie

**Ajout de la commande de build dans `package.json`**

```json
"scripts": {
    "build": "tsc",
    "postbuild": "chmod +x bin/main.js",
    ...
  },
```

Le script `postbuild` est exécuté après la commande `build` et permet de rendre le fichier `bin/main.js` exécutable.
C'est une fonctionnalité de npm qui permet de faire des actions avant `preXXX` et après `postXXX`

## Hello World

### installer commander.js `npm install commander`

https://github.com/tj/commander.js

### Première commande `hello`

Créer le fichier `src/main.ts`

```js
#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("yantech-generate-tests")
  .description("Génère des tests automatisés à partir de specs")
  .version("0.1.0");

program
  .command("hello")
  .description("Affiche un message de bienvenue")
  .action(() => {
    console.log("👋 Hello from Yantech!");
  });

program.parse();
```

Le shebang `#!/usr/bin/env node` est nécessaire pour que le système sache qu'il faut l’exécuter avec Node.js

### configurer package.json pour ajouter la prop `bin`

```json
  "bin": {
    "yantech-generate-tests": "bin/main.js"
  },
```

_La propriété "bin" de package.json est utilisée pour déclarer une ou plusieurs commandes CLI fournies par ton package Node.js. Elle permet à npm (ou yarn, pnpm, etc.) de créer automatiquement des exécutables dans le PATH lors de l’installation globale (npm install -g) ou locale dans un projet._

### Publier localement

`npm link` permet de rendre ton outil CLI disponible globalement sur ta machine pendant le développement, sans avoir besoin de le publier. Cela te permet de tester la commande (yantech-generate-tests) depuis n’importe où, comme si elle était installée avec npm install -g.

### Tester

`>yantech-generate-tests hello`

```
👋 Hello from Yantech!
```
