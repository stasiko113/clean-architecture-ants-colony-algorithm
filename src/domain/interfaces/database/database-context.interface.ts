import { Client } from 'pg';

export interface DatabaseContextInterface {
  connect(): Promise<void>;
  getClient(): Client;
  close(): Promise<void>;
}
