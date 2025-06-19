export interface Display {
  log(message: string): void;
  error(message: string): void;
  success(message: string): void;
  warning(message: string): void;
}
