import type { WeatherData, CacheEntry, Units } from "./types";
import { WEATHER_CACHE_TIME, WEATHER_API_URL } from "./constants";

const weatherCache = new Map<string, CacheEntry<WeatherData>>();

export async function getWeather(city: string, units: Units = 'metric'): Promise<WeatherData | null> {
    const cacheKey = `${city.toLowerCase()}-${units}`;
    const cached = weatherCache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < WEATHER_CACHE_TIME) {
        console.log(`Using cached weather for ${city} (age: ${Math.round((Date.now() - cached.timestamp) / 1000)}s)`);
        return cached.data;
    }

    console.log(`Fetching fresh weather for ${city}`);

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=${units}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check for API errors (error responses have different structure)
        if (!response.ok || data.cod !== 200) {
            console.error(`API Error for ${city}:`, data.message || 'Unknown error');
            return null; // Return null instead of throwing
        }

        const weatherData: WeatherData = data;

        weatherCache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });

        return weatherData;
    } catch (error) {
        console.error(`Failed to fetch weather for ${city}:`, error);
        return null; // Return null on network errors
    }
}

export async function getWeatherByCoords(
    lat: number,
    lon: number,
    units: "metric" | "imperial"
    ) {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}
