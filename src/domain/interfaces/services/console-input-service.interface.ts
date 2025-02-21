export interface ConsoleInputServiceInterface {
  askQuestion(question: string): Promise<string>;
  close(): void;
}
