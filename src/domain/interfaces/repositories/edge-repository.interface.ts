import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';
import { EdgeModel } from 'src/domain/models/edge.model';

export interface EdgeRepositoryInterface
  extends RepositoryInterface<EdgeModel> {}
