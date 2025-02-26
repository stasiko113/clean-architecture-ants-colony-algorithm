import * as console from 'node:console';

import { EdgeEntity } from 'src/domain/entities/edge.entity';
import { PathFindingAlgorithmInterface } from 'src/domain/interfaces/algorithms/path-finding-algorithm.interface';
import {NodeEntity} from "src/domain/entities/node.entity";

type Path = {
  neighbor: number;
  distance: number;
  pheromone: number;
};

export class AntColonyAlgorithm implements PathFindingAlgorithmInterface {
	private graph: Map<number, Path[]>; // Храним граф как список смежности
	private pheromones: WeakMap<EdgeEntity, number>; // Оптимизированное хранение феромонов
	private nodes: Map<number, NodeEntity>; // Храним узлы

	private static readonly ALPHA = 1.0; // Влияние феромона
	private static readonly BETA = 2.0; // Влияние эвристики
	private static readonly Q = 100.0; // Фактор обновления феромонов

	constructor() {
		this.graph = new Map();
		this.pheromones = new WeakMap();
		this.nodes = new Map();
	}


  setGraph(nodes: NodeEntity[], edges: EdgeEntity[]): void {
    this.graph.clear();

	  for (const node of nodes) {
		  this.nodes.set(node.id, node);
	  }

	  for (const edge of edges) {
		  const startNode = this.nodes.get(edge.startNode);
		  const endNode = this.nodes.get(edge.endNode);
		  if (startNode && endNode) {
			  const edge = EdgeEntity.fromNodes(startNode, endNode);
			  this.addEdge(edge);
		  }
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

	private addEdge(edge: EdgeEntity): void {
		if (!this.graph.has(edge.startNode)) this.graph.set(edge.startNode, []);
		if (!this.graph.has(edge.endNode)) this.graph.set(edge.endNode, []);

		const edgeData: Path = { neighbor: edge.endNode, distance: edge.distance, pheromone: 1 };
		this.graph.get(edge.startNode)!.push(edgeData);

		const reverseEdgeData: Path = { neighbor: edge.startNode, distance: edge.distance, pheromone: 1 };
		this.graph.get(edge.endNode)!.push(reverseEdgeData);

		this.pheromones.set(edge, 1.0);
	}

	private antWalk(start: number, end: number): { path: number[]; distance: number } {
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
			const unvisitedNeighbors = neighbors.filter((n) => !visited.has(n.neighbor));

			let next;
			if (unvisitedNeighbors.length > 0) {
				next = this.selectNeighbor(unvisitedNeighbors);
			} else {
				next = this.selectNeighbor(neighbors);
			}

			if (path.includes(next.neighbor)) {
				console.warn(`Detected a cycle involving node ${next.neighbor}. Aborting this path.`);
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
			const start = path[i];
			const end = path[i + 1];

			const edge = EdgeEntity.fromNodes(this.nodes.get(start)!, this.nodes.get(end)!);
			const currentPheromone = this.pheromones.get(edge) || 1.0;
			this.pheromones.set(edge, currentPheromone + AntColonyAlgorithm.Q / distance);
		}
	}


	private selectNeighbor(neighbors: Path[]): Path {
		const weights = neighbors.map(
			(n) => Math.pow(n.pheromone, AntColonyAlgorithm.ALPHA) / Math.pow(n.distance, AntColonyAlgorithm.BETA),
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
