import { RouteDto } from 'src/domain/dtos/route.dto';
import { EdgeModel } from 'src/domain/models/edge.model';
import { GeoPointModel } from 'src/domain/models/geo-point.model';
import { NodeModel } from 'src/domain/models/node.model';

export interface RouteServiceInterface {
  getAllNodes(): Promise<NodeModel[]>;
  getAllEdges(): Promise<EdgeModel[]>;
  findRoute(args: RouteDto): Promise<GeoPointModel[]>;
}
