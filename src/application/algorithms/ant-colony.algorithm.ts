import * as console from 'node:console';

import { EdgeEntity } from 'src/domain/entities/edge.entity';
import { PathFindingAlgorithmInterface } from 'src/domain/interfaces/algorithms/path-finding-algorithm.interface';

type Path = {
  neighbor: number;
  distance: number;
  pheromone: number;
};

export class AntColonyAlgorithm implements PathFindingAlgorithmInterface {
  private graph: Map<number, Path[]>;

  constructor() {
    this.graph = new Map();
  }

  setGraph(edges: EdgeEntity[]): void {
    this.graph.clear();

    for (const edge of edges) {
      if (!edge.startNode || !edge.endNode) {
        continue;
      }

      if (!this.graph.has(edge.startNode)) this.graph.set(edge.startNode, []);
      if (!this.graph.has(edge.endNode)) this.graph.set(edge.endNode, []);

      this.graph.get(edge.startNode)!.push({
        neighbor: edge.endNode,
        distance: edge.distance,
        pheromone: 1,
      });
      this.graph.get(edge.endNode)!.push({
        neighbor: edge.startNode,
        distance: edge.distance,
        pheromone: 1,
      });
    }
  }

  findShortestPath(start: number, end: number, iterations = 100): number[] {
    let bestPath: number[] = [];
    let bestDistance = Infinity;

    for (let i = 0; i < iterations; i++) {
      const { path, distance } = this.antWalk(start, end);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestPath = path;
      }

      this.updatePheromones(path, distance);
    }

    return bestPath;
  }

  private antWalk(
    start: number,
    end: number,
  ): { path: number[]; distance: number } {
    const path: number[] = [start];
    let current = start;
    let totalDistance = 0;
    const visited = new Set<number>();
    visited.add(start);

    while (current !== end) {
      if (!this.graph.has(current)) {
        return { path: [], distance: Infinity };
      }

      const neighbors = this.graph.get(current)!;
      const unvisitedNeighbors = neighbors.filter(
        (n) => !visited.has(n.neighbor),
      );

      let next;
      if (unvisitedNeighbors.length > 0) {
        next = this.selectNeighbor(unvisitedNeighbors);
      } else {
        next = this.selectNeighbor(neighbors);
      }

      if (path.includes(next.neighbor)) {
        console.warn(
          `Detected a cycle involving node ${next.neighbor}. Aborting this path.`,
        );
        return { path: [], distance: Infinity };
      }

      path.push(next.neighbor);
      totalDistance += next.distance;
      current = next.neighbor;
      visited.add(current);
    }

    return { path, distance: totalDistance };
  }

  private updatePheromones(path: number[], distance: number): void {
    for (let i = 0; i < path.length - 1; i++) {
      const edge = this.graph
        .get(path[i])!
        .find((n) => n.neighbor === path[i + 1])!;
      edge.pheromone += 1 / distance;
    }
  }

  private selectNeighbor(neighbors: Path[]): Path {
    const alpha = 1;
    const beta = 1;
    const weights = neighbors.map(
      (n) => Math.pow(n.pheromone, alpha) / Math.pow(n.distance, beta),
    );
    const total = weights.reduce((sum, w) => sum + w, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < neighbors.length; i++) {
      rand -= weights[i];
      if (rand <= 0) {
        return neighbors[i];
      }
    }
    return neighbors[neighbors.length - 1];
  }
}
