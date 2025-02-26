import { EdgeEntity } from 'src/domain/entities/edge.entity';

export interface PathFindingAlgorithmInterface {
  findShortestPath(start: number, end: number, iterations?: number): number[];
  setGraph(edges: EdgeEntity[]): void;
}
