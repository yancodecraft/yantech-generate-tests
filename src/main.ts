#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";
import { generateTestsFromSpec } from "./commands/generate";

dotenv.config();

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

program
  .command("generate")
  .description("Génère des tests à partir d'une spécification")
  .option("-s, --spec <path>", "Chemin vers le fichier de spécification")
  .action((options) => {
    if (!options.spec) {
      console.error(
        "❌ Erreur : Le chemin vers la spécification est requis (--spec)"
      );
      process.exit(1);
    }

    generateTestsFromSpec(options.spec);
  });

program.parse();
