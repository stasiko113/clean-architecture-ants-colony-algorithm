import { Expose, Type } from 'class-transformer';

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
    this.id = id;
    this.lat = lat;
    this.lon = lon;
  }
}
