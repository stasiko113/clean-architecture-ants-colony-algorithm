import { Client } from 'pg';

export async function up(client: Client): Promise<void> {
  await client.query(`
    CREATE EXTENSION IF NOT EXISTS postgis;
  `);

  await client.query(`
      CREATE TABLE IF NOT EXISTS nodes (
          id bigint PRIMARY KEY,
          geom GEOMETRY(Point, 4326) NOT NULL,
          lat DOUBLE PRECISION NOT NULL,
          lon DOUBLE PRECISION NOT NULL
          );
	`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS edges (
      id bigint PRIMARY KEY,
      start_node bigint NOT NULL REFERENCES nodes(id),
      end_node bigint NOT NULL REFERENCES nodes(id),
      distance DOUBLE PRECISION NOT NULL,
      geom GEOMETRY(LineString, 4326) NOT NULL
    );
  `);
}

export async function down(client: Client): Promise<void> {
  await client.query('DROP TABLE IF EXISTS edges;');
  await client.query('DROP TABLE IF EXISTS nodes;');
  await client.query('DROP EXTENSION IF EXISTS postgis;');
}
