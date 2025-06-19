import { Display } from "../core/ports";

export class DisplayAdapter implements Display {
  log(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }

  success(message: string): void {
    console.log(`✅ ${message}`);
  }

  warning(message: string): void {
    console.warn(`⚠️ ${message}`);
  }
}
