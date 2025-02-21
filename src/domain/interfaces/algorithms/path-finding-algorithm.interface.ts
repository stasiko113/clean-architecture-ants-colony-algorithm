import { EdgeModel } from 'src/domain/models/edge.model';

export interface PathFindingAlgorithmInterface {
  findShortestPath(start: number, end: number, iterations?: number): number[];
  setGraph(edges: EdgeModel[]): void;
}
