# Weather Dashboard

Modern fullstack weather dashboard with React Router v7, PostgreSQL, and OpenWeatherMap API.

## Features

- Real-time weather for 10 cities
- Detailed weather view (temperature, wind, clouds, humidity, pressure, sun times)
- Add/remove cities with search
- Temperature unit toggle (°C/°F)
- Auto-refresh every 10 minutes
- Clean, responsive UI

## Tech Stack

- React Router v7 (fullstack)
- PostgreSQL
- OpenWeatherMap API
- TypeScript
- Tailwind CSS

## Quick Start

### Local Development

1. Install dependencies
   ```bash
   npm install
   ```

2. Create `.env` file
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   DATABASE_URL=postgresql://user:pass@localhost:5432/weather
   ```

3. Start PostgreSQL (with Docker)
   ```bash
   docker-compose up -d db
   ```

4. Run dev server
   ```bash
   npm run dev
   ```

Database auto-initializes with 10 cities on first run.

### Docker Compose

```bash
docker-compose up
```

App at `http://localhost:3000`

## Production Deployment

### Netlify

1. Get PostgreSQL database: [Neon](https://neon.tech) / [Supabase](https://supabase.com) / [Railway](https://railway.app)

2. Deploy to Netlify:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

3. Set environment variables in Netlify dashboard:
   - `DATABASE_URL`
   - `OPENWEATHER_API_KEY`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## API Key

Get free API key at [OpenWeatherMap](https://openweathermap.org/api)
