export const WEATHER_CACHE_TIME = 10 * 60 * 1000;
export const GEOCODING_CACHE_TIME = 60 * 60 * 1000;

export const MIN_QUERY_LENGTH = 1;
export const MAX_RESULTS = 100;
export const DEBOUNCE_DELAY = 150;

export const WEATHER_AUTO_REFRESH = 10 * 60 * 1000;

export const INITIAL_CITIES = [
  ['Riga', 'LV', 56.9496, 24.1052],
  ['London', 'GB', 51.5074, -0.1278],
  ['Vilnius', 'LT', 54.6872, 25.2797],
  ['Tallinn', 'EE', 59.4370, 24.7536],
  ['New York', 'US', 40.7128, -74.0060],
  ['Paris', 'FR', 48.8566, 2.3522],
  ['Berlin', 'DE', 52.5200, 13.4050],
  ['Moscow', 'RU', 55.7558, 37.6173],
  ['Dubai', 'AE', 25.2048, 55.2708],
  ['Singapore', 'SG', 1.3521, 103.8198],
];

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';
