import { EdgeEntity } from 'src/domain/entities/edge.entity';
import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';

// @ts-expect-error because es-lint except error that interface equivalent as supe type but its should be
export interface EdgeRepositoryInterface
  extends RepositoryInterface<EdgeEntity> {}
