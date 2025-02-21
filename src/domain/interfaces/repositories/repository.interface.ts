export interface RepositoryInterface<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: number, entity: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}
