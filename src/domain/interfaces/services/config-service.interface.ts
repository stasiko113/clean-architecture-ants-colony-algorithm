export interface ConfigServiceInterface {
  getDBHost(): string;
  getDBPort(): number;
  getDBUser(): string;
  getDBPassword(): string;
  getDBName(): string;
}
