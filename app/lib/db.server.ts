import { Pool } from 'pg';
import type { DatabaseCity } from './types';
import { INITIAL_CITIES } from './constants';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function getCities(): Promise<DatabaseCity[]> {
  const result = await pool.query('SELECT * FROM cities ORDER BY name');
  return result.rows;
}

export async function addCity(
  name: string,
  country: string,
  lat: number,
  lon: number
): Promise<DatabaseCity> {
  const result = await pool.query(
    `
    INSERT INTO cities (name, country, lat, lon)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (lat, lon) DO NOTHING
    RETURNING *
    `,
    [name, country, lat, lon]
  );

  return result.rows[0];
}

export async function deleteCity(id: number): Promise<void> {
  await pool.query('DELETE FROM cities WHERE id = $1', [id]);
}

export async function initDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    CONSTRAINT unique_city_coords UNIQUE (lat, lon)
    )
  `);

  const result = await pool.query('SELECT COUNT(*) FROM cities');
  const count = parseInt(result.rows[0].count);

  if (count === 0) {
    for (const [name, country, lat, lon] of INITIAL_CITIES) {
      await pool.query(
        'INSERT INTO cities (name, country, lat, lon) VALUES ($1, $2, $3, $4) ON CONFLICT (lat, lon) DO NOTHING',
        [name, country, lat, lon]
      );
    }

    console.log(`Database seeded with ${INITIAL_CITIES.length} initial cities`);
  }
}

export { pool };
