import { Client } from 'pg';
import { DatabaseContextInterface } from 'src/domain/interfaces/database/database-context.interface';
import { ConfigServiceInterface } from 'src/domain/interfaces/services/config-service.interface';

export default class DatabaseContext implements DatabaseContextInterface {
  private readonly client: Client;

  constructor(configService: ConfigServiceInterface) {
    this.client = new Client({
      user: configService.getDBUser(),
      host: configService.getDBHost(),
      database: configService.getDBName(),
      password: configService.getDBPassword,
      port: configService.getDBPort(),
    });
  }

  public async connect(): Promise<void> {
    if (!this.client) return;
    await this.client.connect();
  }

  public getClient(): Client {
    return this.client;
  }

  public async close(): Promise<void> {
    await this.client.end();
  }
}
