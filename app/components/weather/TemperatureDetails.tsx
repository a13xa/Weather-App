import type { WeatherData } from "../../lib/types";
import { Card } from "../ui/Card";
import { CardTitle } from "../ui/CardTitle";
import { StatsGrid } from "../ui/StatsGrid";
import { StatDisplay } from "../ui/StatDisplay";

interface TemperatureDetailsProps {
  weather: WeatherData;
  tempUnit: string;
}

export function TemperatureDetails({ weather, tempUnit }: TemperatureDetailsProps) {
  return (
    <Card>
      <CardTitle>Temperature</CardTitle>
      <StatsGrid columns={2}>
        <StatDisplay
          label="Current"
          value={`${Math.round(weather.main.temp)}${tempUnit}`}
        />
        <StatDisplay
          label="Feels like"
          value={`${Math.round(weather.main.feels_like)}${tempUnit}`}
        />
        <StatDisplay
          label="Min"
          value={`${Math.round(weather.main.temp_min)}${tempUnit}`}
        />
        <StatDisplay
          label="Max"
          value={`${Math.round(weather.main.temp_max)}${tempUnit}`}
        />
      </StatsGrid>
    </Card>
  );
}
