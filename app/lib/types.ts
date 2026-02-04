// WEATHER API TYPES (OpenWeatherMap Current Weather API 2.5)
export interface WeatherCondition {
  id: number;
  main: string; // e.g., "Rain", "Snow", "Clear"
  description: string; // e.g., "light rain"
  icon: string; // e.g., "10d"
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number; // hPa
  humidity: number; // percentage
  sea_level?: number; // hPa
  grnd_level?: number; // hPa
}

export interface WeatherWind {
  speed: number; // meter/sec or miles/hour depending on units
  deg: number; // wind direction in degrees
  gust?: number; // wind gust speed
}

export interface WeatherClouds {
  all: number; // cloudiness percentage
}

export interface WeatherRain {
  "1h"?: number; // rain volume for last 1 hour, mm
  "3h"?: number; // rain volume for last 3 hours, mm
}

export interface WeatherSnow {
  "1h"?: number; // snow volume for last 1 hour, mm
  "3h"?: number; // snow volume for last 3 hours, mm
}

export interface WeatherSys {
  type?: number;
  id?: number;
  country: string; // country code (e.g., "LV")
  sunrise: number; // unix timestamp
  sunset: number; // unix timestamp
}

export interface WeatherCoord {
  lon: number;
  lat: number;
}

export interface WeatherData {
  coord: WeatherCoord;
  weather: WeatherCondition[];
  base: string;
  main: WeatherMain;
  visibility: number; // meters
  wind: WeatherWind;
  clouds: WeatherClouds;
  rain?: WeatherRain;
  snow?: WeatherSnow;
  dt: number; // unix timestamp
  sys: WeatherSys;
  timezone: number; // shift in seconds from UTC
  id: number; // city ID
  name: string; // city name
  cod: number; // internal parameter
}

// geocoding api types (OpenWeatherMap Geocoding API)
export interface GeocodingResult {
  name: string; // city name
  local_names?: Record<string, string>; // city name in different languages
  lat: number;
  lon: number;
  country: string; // country code (e.g., "LV")
  state?: string; // state/province name (if available)
}

// database types
export interface DatabaseCity {
  id: number;
  name: string;
  country?: string;
  lat: number;
  lon: number;
}

// cache types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// component prop for types
export interface CityCardProps {
  data: WeatherData;
}

// unit types
export type Units = "metric" | "imperial";

// NOTE: Constants have been moved to lib/constants.ts
// Import CACHE_DURATIONS, SEARCH_SETTINGS, etc. from constants.ts
