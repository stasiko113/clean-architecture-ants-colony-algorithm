import * as readline from 'readline';

import { ConsoleInputServiceInterface } from 'src/domain/interfaces/services/console-input-service.interface';

export class ConsoleInputService implements ConsoleInputServiceInterface {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => resolve(answer));
    });
  }

  close(): void {
    this.rl.close();
  }
}
