import { plainToInstance } from 'class-transformer';
import { Client } from 'pg';
import { NodeRepositoryInterface } from 'src/domain/interfaces/repositories/node-repository.interface';
import { NodeModel } from 'src/domain/models/node.model';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';

export class NodeRepository
  extends BaseRepository<NodeModel>
  implements NodeRepositoryInterface
{
  constructor(client: Client) {
    super(client, 'edges', NodeModel);
  }

  async getNearestNode(lat: number, lon: number): Promise<NodeModel> {
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

    return plainToInstance(result.rows[0], NodeModel);
  }

  async getNodesByIds(nodeIds: number[]): Promise<NodeModel[]> {
    const result = await this.client.query(
      `
            SELECT id, lat, lon FROM nodes
            WHERE id = ANY($1);
        `,
      [nodeIds],
    );

    return plainToInstance(NodeModel, result.rows);
  }
}
