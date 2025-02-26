export class NodeEntity {
	constructor(
		public readonly id: number,
		public readonly lat: number,
		public readonly lon: number,
	) {}

	// Haversine formula for calculating distance between two points
	distanceTo(other: NodeEntity): number {
		const R = 6371000;
		const φ1 = this.lat * (Math.PI / 180);
		const φ2 = other.lat * (Math.PI / 180);
		const Δφ = (other.lat - this.lat) * (Math.PI / 180);
		const Δλ = (other.lon - this.lon) * (Math.PI / 180);

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	}
}
