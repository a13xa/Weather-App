import type { Route } from "./+types/weather.$city";
import { getWeather } from "../lib/weather.server";
import { WeatherHeader } from "../components/weather/WeatherHeader";
import { TemperatureCard } from "../components/weather/TemperatureCard";
import { TemperatureDetails } from "../components/weather/TemperatureDetails";
import { WindCard } from "../components/weather/WindCard";
import { CloudsRainCards } from "../components/weather/CloudsRainCards";
import { AdditionalDetailsCard } from "../components/weather/AdditionalDetailsCard";
import { SunTimesCard } from "../components/weather/SunTimesCard";

export async function loader({ params, request }: Route.LoaderArgs) {
  const city = params.city ? decodeURIComponent(params.city) : null;

  if (!city) {
    throw new Response("City not found", { status: 404 });
  }

  const url = new URL(request.url);
  const units = (url.searchParams.get("units") as "metric" | "imperial") || "metric";

  const weatherData = await getWeather(city, units);

  if (!weatherData) {
    throw new Response("Weather data not found", { status: 404 });
  }

  return { weather: weatherData, cityName: city, units };
}

export default function WeatherDetail({ loaderData }: Route.ComponentProps) {
  const { weather, units } = loaderData;
  const tempUnit = units === "metric" ? "°C" : "°F";
  const speedUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="min-h-screen bg-gray-50">
      <WeatherHeader weather={weather} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <TemperatureCard weather={weather} tempUnit={tempUnit} />
        <TemperatureDetails weather={weather} tempUnit={tempUnit} />
        <WindCard weather={weather} speedUnit={speedUnit} />
        <CloudsRainCards weather={weather} />
        <AdditionalDetailsCard weather={weather} />
        <SunTimesCard weather={weather} />
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <p className="text-xs text-gray-500">
            Data from OpenWeatherMap API • Updated in real-time
          </p>
        </div>
      </footer>
    </div>
  );
}
