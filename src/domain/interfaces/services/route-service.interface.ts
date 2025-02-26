import { RouteDto } from 'src/domain/dtos/route.dto';
import { EdgeEntity } from 'src/domain/entities/edge.entity';
import { GeoPointModel } from 'src/domain/entities/geo-point.model';
import { NodeModel } from 'src/domain/entities/node.entity';

export interface RouteServiceInterface {
  getAllNodes(): Promise<NodeModel[]>;
  getAllEdges(): Promise<EdgeEntity[]>;
  findRoute(args: RouteDto): Promise<GeoPointModel[]>;
}
