import type { WeatherData } from "../../lib/types";
import { getWindDirection } from "../../lib/weather-utils";
import { Card } from "../ui/Card";
import { CardTitle } from "../ui/CardTitle";
import { StatsGrid } from "../ui/StatsGrid";
import { StatDisplay } from "../ui/StatDisplay";

interface WindCardProps {
  weather: WeatherData;
  speedUnit: string;
}

export function WindCard({ weather, speedUnit }: WindCardProps) {
  return (
    <Card>
      <CardTitle>Wind</CardTitle>
      <StatsGrid columns={3}>
        <StatDisplay
          label="Speed"
          value={`${Math.round(weather.wind.speed)} ${speedUnit}`}
          size="md"
        />
        <StatDisplay
          label="Direction"
          value={`${getWindDirection(weather.wind.deg)} (${weather.wind.deg}°)`}
          size="md"
        />
        {weather.wind.gust && (
          <StatDisplay
            label="Gust"
            value={`${Math.round(weather.wind.gust)} ${speedUnit}`}
            size="md"
          />
        )}
      </StatsGrid>
    </Card>
  );
}
