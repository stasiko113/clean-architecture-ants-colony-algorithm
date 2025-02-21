export class RouteDto {
  constructor(
    public readonly latStart: number,
    public readonly lonStart: number,
    public readonly latEnd: number,
    public readonly lonEnd: number,
  ) {}

  static validate(data: any): RouteDto {
    const { startLat, startLon, endLat, endLon } = data;

    if (
      typeof startLat !== 'number' ||
      isNaN(startLat) ||
      typeof startLon !== 'number' ||
      isNaN(startLon) ||
      typeof endLat !== 'number' ||
      isNaN(endLat) ||
      typeof endLon !== 'number' ||
      isNaN(endLon)
    ) {
      throw new Error('Invalid route data. All coordinates must be numbers.');
    }

    return new RouteDto(startLat, startLon, endLat, endLon);
  }
}
