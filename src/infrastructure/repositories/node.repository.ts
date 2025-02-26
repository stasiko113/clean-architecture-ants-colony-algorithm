import { Client } from 'pg';
import { NodeMapperProfile } from 'src/application/mappers/node-mapper.profile';
import { NodeModel } from 'src/application/models/node.model';
import { NodeEntity } from 'src/domain/entities/node.entity';
import { NodeRepositoryInterface } from 'src/domain/interfaces/repositories/node-repository.interface';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';

export class NodeRepository
  extends BaseRepository<NodeEntity, NodeModel>
  implements NodeRepositoryInterface
{
  constructor(client: Client, _mapper: NodeMapperProfile) {
    super(client, 'edges', _mapper);
  }

  async getNearestNode(lat: number, lon: number): Promise<NodeEntity> {
    const result = await this.client.query(
      `
            SELECT id, lat, lon FROM nodes
            ORDER BY geom <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)
            LIMIT 1;
        `,
      [lon, lat],
    );

    if (result.rows.length === 0) {
      throw new Error('nodes not found');
    }

    return this._mapper.toEntity(result.rows[0]) as NodeEntity;
  }

  async getNodesByIds(nodeIds: number[]): Promise<NodeEntity[]> {
    const result = await this.client.query(
      `
            SELECT id, lat, lon FROM nodes
            WHERE id = ANY($1);
        `,
      [nodeIds],
    );

    return this._mapper.toEntity(result.rows) as NodeEntity[];
  }
}
