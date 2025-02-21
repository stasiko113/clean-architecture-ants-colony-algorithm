import console from 'node:console';

import { Expose, Type } from 'class-transformer';
import { RouteService } from 'src/application/services/route.service';

export class NodeModel {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => Number)
  lat: number;

  @Expose()
  @Type(() => Number)
  lon: number;

  constructor(id: number, lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
    this.id = id;
  }

  // Haversine formula for calculating distance between two points in a sphere
  distanceTo(other: NodeModel): number {
    const R = 6371000;
    const φ1 = this.lat * (Math.PI / 180);
    const φ2 = other.lat * (Math.PI / 180);
    const Δφ = (other.lat - this.lat) * (Math.PI / 180);
    const Δλ = (other.lon - this.lon) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    console.log(RouteService);

    return R * c;
  }
}
