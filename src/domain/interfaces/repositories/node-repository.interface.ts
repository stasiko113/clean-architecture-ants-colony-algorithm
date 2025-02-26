import { NodeEntity } from 'src/domain/entities/node.entity';
import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';

export interface NodeRepositoryInterface
  extends RepositoryInterface<NodeEntity> {
  getNearestNode(lat: number, lon: number): Promise<NodeEntity>;
  getNodesByIds(nodeIds: number[]): Promise<NodeEntity[]>;
}
