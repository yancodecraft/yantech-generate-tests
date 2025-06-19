import * as fs from "fs";
import { FileSystem as FileSystemPort } from "../core/ports";

export class FileSystemAdapter implements FileSystemPort {
  async readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
          reject(
            new Error(
              `Erreur lors de la lecture du fichier ${path}: ${err.message}`
            )
          );
        } else {
          resolve(data);
        }
      });
    });
  }

  async writeFile(path: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, "utf-8", (err) => {
        if (err) {
          reject(
            new Error(
              `Erreur lors de l'écriture du fichier ${path}: ${err.message}`
            )
          );
        } else {
          resolve();
        }
      });
    });
  }

  async exists(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  async createDirectory(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
          reject(
            new Error(
              `Erreur lors de la création du répertoire ${path}: ${err.message}`
            )
          );
        } else {
          resolve();
        }
      });
    });
  }
}
