import { EdgeEntity } from 'src/domain/entities/edge.entity';
import {NodeEntity} from "src/domain/entities/node.entity";

export interface PathFindingAlgorithmInterface {
  findShortestPath(start: number, end: number, iterations?: number): number[];
  setGraph(nodes: NodeEntity[], edges: EdgeEntity[]): void;
}
