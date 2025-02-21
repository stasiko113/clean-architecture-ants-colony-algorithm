import { Client } from 'pg';
import { EdgeRepositoryInterface } from 'src/domain/interfaces/repositories/edge-repository.interface';
import { EdgeModel } from 'src/domain/models/edge.model';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';

export class EdgeRepository
  extends BaseRepository<EdgeModel>
  implements EdgeRepositoryInterface
{
  constructor(client: Client) {
    super(client, 'edges', EdgeModel);
  }
}
