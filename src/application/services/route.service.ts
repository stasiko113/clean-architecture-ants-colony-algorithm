import { injectable } from 'inversify';
import { RouteDto } from 'src/domain/dtos/route.dto';
import { PathFindingAlgorithmInterface } from 'src/domain/interfaces/algorithms/path-finding-algorithm.interface';
import { EdgeRepositoryInterface } from 'src/domain/interfaces/repositories/edge-repository.interface';
import { NodeRepositoryInterface } from 'src/domain/interfaces/repositories/node-repository.interface';
import { RouteServiceInterface } from 'src/domain/interfaces/services/route-service.interface';
import { EdgeModel } from 'src/domain/models/edge.model';
import { GeoPointModel } from 'src/domain/models/geo-point.model';
import { NodeModel } from 'src/domain/models/node.model';

@injectable()
export class RouteService implements RouteServiceInterface {
  constructor(
    private nodeRepository: NodeRepositoryInterface,
    private edgeRepository: EdgeRepositoryInterface,
    private pathfindingAlgorithm: PathFindingAlgorithmInterface,
  ) {}

  async getAllNodes(): Promise<NodeModel[]> {
    return this.nodeRepository.getAll();
  }

  async getAllEdges(): Promise<EdgeModel[]> {
    return this.edgeRepository.getAll();
  }

  async findRoute(args: RouteDto): Promise<GeoPointModel[]> {
    const { latStart, lonStart, latEnd, lonEnd } = args;
    const startNode = await this.nodeRepository.getNearestNode(
      latStart,
      lonStart,
    );
    const endNode = await this.nodeRepository.getNearestNode(latEnd, lonEnd);

    const virtualStart = new NodeModel(0, latStart, lonStart);
    const virtualEnd = new NodeModel(1, latEnd, lonEnd);

    const edges = await this.edgeRepository.getAll();
    const tempEdges: EdgeModel[] = [
      ...edges,
      EdgeModel.fromNodes(virtualStart, startNode),
      EdgeModel.fromNodes(virtualEnd, endNode),
    ];

    this.pathfindingAlgorithm.setGraph(tempEdges);

    return this.getCoordinatesForRoute(
      this.pathfindingAlgorithm.findShortestPath(startNode.id, endNode.id),
    );
  }

  async getCoordinatesForRoute(nodeIds: number[]): Promise<GeoPointModel[]> {
    const nodes = await this.nodeRepository.getNodesByIds(nodeIds);
    return nodes.map((node) => new GeoPointModel(node.lat, node.lon));
  }
}
