import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';
import { EdgeEntity } from 'src/domain/entities/edge.entity';

export interface EdgeRepositoryInterface
  extends RepositoryInterface<EdgeEntity> {}
