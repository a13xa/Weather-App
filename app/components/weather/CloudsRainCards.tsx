import type { WeatherData } from "../../lib/types";
import { Card } from "../ui/Card";
import { CardTitle } from "../ui/CardTitle";

interface CloudsRainCardsProps {
  weather: WeatherData;
}

export function CloudsRainCards({ weather }: CloudsRainCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card marginBottom={false}>
        <CardTitle>Clouds</CardTitle>
        <p className="text-3xl font-medium text-gray-900">
          {weather.clouds.all}%
        </p>
        <p className="text-sm text-gray-500 mt-1">Cloud cover</p>
      </Card>

      {weather.rain && (
        <Card marginBottom={false}>
          <CardTitle>Rain</CardTitle>
          <p className="text-3xl font-medium text-gray-900">
            {weather.rain['1h'] || weather.rain['3h'] || 0} mm
          </p>
          <p className="text-sm text-gray-500 mt-1">Last hour</p>
        </Card>
      )}
    </div>
  );
}
