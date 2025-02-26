import { injectable } from 'inversify';
import { RouteDto } from 'src/domain/dtos/route.dto';
import { EdgeEntity } from 'src/domain/entities/edge.entity';
import { GeoPointModel } from 'src/domain/entities/geo-point.model';
import { NodeEntity } from 'src/domain/entities/node.entity';
import { PathFindingAlgorithmInterface } from 'src/domain/interfaces/algorithms/path-finding-algorithm.interface';
import { EdgeRepositoryInterface } from 'src/domain/interfaces/repositories/edge-repository.interface';
import { NodeRepositoryInterface } from 'src/domain/interfaces/repositories/node-repository.interface';
import { RouteServiceInterface } from 'src/domain/interfaces/services/route-service.interface';

@injectable()
export class RouteService implements RouteServiceInterface {
  constructor(
    private nodeRepository: NodeRepositoryInterface,
    private edgeRepository: EdgeRepositoryInterface,
    private pathfindingAlgorithm: PathFindingAlgorithmInterface,
  ) {}

  async getAllNodes(): Promise<NodeEntity[]> {
    return this.nodeRepository.getAll();
  }

  async getAllEdges(): Promise<EdgeEntity[]> {
    return this.edgeRepository.getAll();
  }

  async findRoute(args: RouteDto): Promise<GeoPointModel[]> {
    const { latStart, lonStart, latEnd, lonEnd } = args;
    const startNode = await this.nodeRepository.getNearestNode(
      latStart,
      lonStart,
    );
    const endNode = await this.nodeRepository.getNearestNode(latEnd, lonEnd);

    const virtualStart = new NodeEntity(0, latStart, lonStart);
    const virtualEnd = new NodeEntity(1, latEnd, lonEnd);

    let edges: EdgeEntity[] = await this.edgeRepository.getAll();
	  edges = [
      ...edges,
      EdgeEntity.fromNodes(virtualStart, startNode),
      EdgeEntity.fromNodes(virtualEnd, endNode),
    ];

		const nodes = await this.nodeRepository.getAll();
    this.pathfindingAlgorithm.setGraph(nodes, edges);

    return this.getCoordinatesForRoute(
      this.pathfindingAlgorithm.findShortestPath(startNode.id, endNode.id),
    );
  }

  async getCoordinatesForRoute(nodeIds: number[]): Promise<GeoPointModel[]> {
    const nodes = await this.nodeRepository.getNodesByIds(nodeIds);
    return nodes.map((node) => new GeoPointModel(node.lat, node.lon));
  }
}
