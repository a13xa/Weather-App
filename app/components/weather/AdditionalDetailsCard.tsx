import type { WeatherData } from "../../lib/types";
import { Card } from "../ui/Card";
import { CardTitle } from "../ui/CardTitle";
import { StatsGrid } from "../ui/StatsGrid";
import { StatDisplay } from "../ui/StatDisplay";

interface AdditionalDetailsCardProps {
  weather: WeatherData;
}

export function AdditionalDetailsCard({ weather }: AdditionalDetailsCardProps) {
  return (
    <Card>
      <CardTitle>Additional Details</CardTitle>
      <StatsGrid columns={3}>
        <StatDisplay
          label="Humidity"
          value={`${weather.main.humidity}%`}
          size="md"
        />
        <StatDisplay
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
          size="md"
        />
        <StatDisplay
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
          size="md"
        />
      </StatsGrid>
    </Card>
  );
}
