import { Expose, Type } from 'class-transformer';

export class EdgeModel {
  @Expose({ name: 'start_node' })
  @Type(() => Number)
  start_node: number;

  @Expose({ name: 'end_node' })
  @Type(() => Number)
  end_node: number;

  @Expose()
  distance: number;

  constructor(startNode: number, endNode: number, distance: number) {
    this.start_node = startNode;
    this.end_node = endNode;
    this.distance = distance;
  }
}
