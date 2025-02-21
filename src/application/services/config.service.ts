import { config } from 'dotenv';
import { injectable } from 'inversify';
import { EnvironmentKeyEnum } from 'src/domain/enums/env.enum';
import { ConfigServiceInterface } from 'src/domain/interfaces/services/config-service.interface';

config();

@injectable()
export class ConfigService implements ConfigServiceInterface {
  getDBHost(): string {
    return getRequiredAttribute(EnvironmentKeyEnum.dbHost);
  }

  getDBPort(): number {
    return +getRequiredAttribute(EnvironmentKeyEnum.dbPort);
  }

  getDBUser(): string {
    return getRequiredAttribute(EnvironmentKeyEnum.dbUser);
  }

  getDBPassword(): string {
    return getRequiredAttribute(EnvironmentKeyEnum.dbPassword);
  }

  getDBName(): string {
    return getRequiredAttribute(EnvironmentKeyEnum.dbName);
  }
}

function getRequiredAttribute(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} not found`);
  }
  return value;
}
