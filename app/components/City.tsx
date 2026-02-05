import { Link, useSearchParams } from "react-router";
import type { WeatherData } from "../lib/types";
import { getCountryName } from "../lib/countries";

interface CityProps {
    data: WeatherData;
}

export function City({ data }: CityProps) {
    const [searchParams] = useSearchParams();
    const units = searchParams.get("units") || "metric";
    const tempUnit = units === "metric" ? "°C" : "°F";
    const speedUnit = units === "metric" ? "m/s" : "mph";

    if (!data || !data.weather || data.weather.length === 0) {
        return (
        <div className="border border-red-200 bg-red-50 p-4 rounded">
            <p className="text-red-800 text-sm">Error loading data</p>
        </div>
        );
    }

    return (
        <Link
        to={`/weather/${encodeURIComponent(data.name)}?units=${units}`}
        className="block border border-gray-200 bg-white p-6 rounded hover:border-gray-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
        <div className="flex items-start justify-between mb-4">
            <div>
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>
                {data.sys?.country && (
                <span className="text-xs text-gray-400 font-medium">
                    {getCountryName(data.sys.country)}
                </span>
                )}
            </div>
            <p className="text-sm text-gray-500 capitalize mt-1">
                {data.weather[0].description}
            </p>
            </div>
            <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-16 h-16"
            />
        </div>

        <div className="mb-4">
            <p className="text-4xl font-medium text-gray-900">
            {Math.round(data.main.temp)}{tempUnit}
            </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
            <p className="text-xs text-gray-500">Feels like</p>
            <p className="text-sm font-medium text-gray-900">
                {Math.round(data.main.feels_like)}{tempUnit}
            </p>
            </div>
            <div>
            <p className="text-xs text-gray-500">Humidity</p>
            <p className="text-sm font-medium text-gray-900">
                {data.main.humidity}%
            </p>
            </div>
            <div>
            <p className="text-xs text-gray-500">Wind</p>
            <p className="text-sm font-medium text-gray-900">
                {Math.round(data.wind.speed)} {speedUnit}
            </p>
            </div>
        </div>
        </Link>
    );
}
