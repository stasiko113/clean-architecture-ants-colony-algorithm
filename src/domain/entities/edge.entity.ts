import {NodeEntity} from "src/domain/entities/node.entity";

export class EdgeEntity {
	constructor(
		public readonly startNode: number,
		public readonly endNode: number,
		public readonly distance: number,
	) {}

	static fromNodes(start: NodeEntity, end: NodeEntity): EdgeEntity {
		return new EdgeEntity(start.id, end.id, start.distanceTo(end));
	}
}
