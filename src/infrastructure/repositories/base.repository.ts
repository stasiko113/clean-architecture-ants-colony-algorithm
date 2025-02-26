import { Client } from 'pg';
import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';
import {MapperProfileInterface} from "src/application/mappers/mapper-profile.interface";

export class BaseRepository<T, M> implements RepositoryInterface<T> {
  constructor(
    protected client: Client,
    private tableName: string,
    protected _mapper: MapperProfileInterface<M, T>,
  ) {}

  async getAll(): Promise<T[]> {
    const result = await this.client.query(`SELECT * FROM ${this.tableName}`);
    return this._mapper.toEntity(result.rows) as T[];
  }

  async getById(id: number): Promise<T | null> {
    const result = await this.client.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id],
    );
    return result.rows.length
      ? this._mapper.toEntity(result.rows[0]) as T
      : null;
  }

  async create(entity: Partial<T>): Promise<T> {
    const keys = Object.keys(entity);
    const values = Object.values(entity);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;

    const result = await this.client.query(query, values);
    return this._mapper.toEntity(result.rows[0]) as T;
  }

  async update(id: number, entity: Partial<T>): Promise<T | null> {
    const keys = Object.keys(entity);
    const values = Object.values(entity);
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    if (keys.length === 0) return null;

    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    const result = await this.client.query(query, [...values, id]);

    return result.rows.length
      ? this._mapper.toEntity(result.rows[0]) as T
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
