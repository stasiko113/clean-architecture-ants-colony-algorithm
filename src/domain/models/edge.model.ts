import { Expose, Type } from 'class-transformer';
import { NodeModel } from 'src/domain/models/node.model';

export class EdgeModel {
  @Expose({ name: 'start_node' })
  @Type(() => Number)
  startNode: number;

  @Expose({ name: 'end_node' })
  @Type(() => Number)
  endNode: number;

  @Expose()
  distance: number;

  constructor(startNode: number, endNode: number, distance: number) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.distance = distance;
  }

  static fromNodes(start: NodeModel, end: NodeModel): EdgeModel {
    return new EdgeModel(start.id, end.id, start.distanceTo(end));
  }
}
