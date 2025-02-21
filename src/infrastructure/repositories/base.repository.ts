import { plainToInstance } from 'class-transformer';
import { Client } from 'pg';
import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';

export class BaseRepository<T> implements RepositoryInterface<T> {
  constructor(
    protected client: Client,
    private tableName: string,
    private model: new (...args: any[]) => T,
  ) {}

  async getAll(): Promise<T[]> {
    const result = await this.client.query(`SELECT * FROM ${this.tableName}`);
    return plainToInstance(this.model, result.rows);
  }

  async getById(id: number): Promise<T | null> {
    const result = await this.client.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id],
    );
    return result.rows.length
      ? plainToInstance(this.model, result.rows[0])
      : null;
  }

  async create(entity: Partial<T>): Promise<T> {
    const keys = Object.keys(entity);
    const values = Object.values(entity);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;

    const result = await this.client.query(query, values);
    return plainToInstance(this.model, result.rows[0]);
  }

  async update(id: number, entity: Partial<T>): Promise<T | null> {
    const keys = Object.keys(entity);
    const values = Object.values(entity);
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    if (keys.length === 0) return null; // Если нечего обновлять

    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    const result = await this.client.query(query, [...values, id]);

    return result.rows.length
      ? plainToInstance(this.model, result.rows[0])
      : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.client.query(
      `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`,
      [id],
    );
    return (result.rowCount || 0) > 0;
  }
}
