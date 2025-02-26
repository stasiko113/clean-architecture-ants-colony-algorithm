import { Client } from 'pg';
import { EdgeMapperProfile } from 'src/application/mappers/edge-mapper.profile';
import { EdgeModel } from 'src/application/models/edge.model';
import { EdgeEntity } from 'src/domain/entities/edge.entity';
import { EdgeRepositoryInterface } from 'src/domain/interfaces/repositories/edge-repository.interface';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';

export class EdgeRepository
  extends BaseRepository<EdgeEntity, EdgeModel>
  implements EdgeRepositoryInterface
{
  constructor(client: Client, _mapper: EdgeMapperProfile) {
    super(client, 'edges', _mapper);
  }
}
