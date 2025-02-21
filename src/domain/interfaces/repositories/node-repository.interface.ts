import { RepositoryInterface } from 'src/domain/interfaces/repositories/repository.interface';
import { NodeModel } from 'src/domain/models/node.model';

export interface NodeRepositoryInterface
  extends RepositoryInterface<NodeModel> {
  getNearestNode(lat: number, lon: number): Promise<NodeModel>;
  getNodesByIds(nodeIds: number[]): Promise<NodeModel[]>;
}
