import type { GeocodingResult, CacheEntry } from "./types";
import { GEOCODING_CACHE_TIME, MIN_QUERY_LENGTH, MAX_RESULTS, GEOCODING_API_URL } from "./constants";

const geocodingCache = new Map<string, CacheEntry<GeocodingResult[]>>();

export async function searchCities(query: string): Promise<GeocodingResult[]> {
    if (!query || query.length < MIN_QUERY_LENGTH) {
        return [];
    }

    const cacheKey = query.toLowerCase();
    const cached = geocodingCache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < GEOCODING_CACHE_TIME) {
        console.log(`Using cached city search for "${query}"`);
        return cached.data;
    }

    console.log(`Fetching city search results for "${query}"`);
    console.log(`MAX_RESULTS setting: ${MAX_RESULTS}`);

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `${GEOCODING_API_URL}?q=${encodeURIComponent(query)}&limit=${MAX_RESULTS}&appid=${API_KEY}`;

    console.log(`API URL (without key): ${GEOCODING_API_URL}?q=${encodeURIComponent(query)}&limit=${MAX_RESULTS}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Geocoding API Error: ${response.status}`);
            return [];
        }

        const data: GeocodingResult[] = await response.json();

        console.log(`API returned ${data.length} results for "${query}"`);

        geocodingCache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });

        return data;
    } catch (error) {
        console.error(`Failed to search cities:`, error);
        return [];
    }
}
