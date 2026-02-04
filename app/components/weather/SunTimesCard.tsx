import type { WeatherData } from "../../lib/types";
import { formatTime } from "../../lib/weather-utils";
import { Card } from "../ui/Card";
import { CardTitle } from "../ui/CardTitle";
import { StatsGrid } from "../ui/StatsGrid";
import { StatDisplay } from "../ui/StatDisplay";

interface SunTimesCardProps {
  weather: WeatherData;
}

export function SunTimesCard({ weather }: SunTimesCardProps) {
  return (
    <Card marginBottom={false}>
      <CardTitle>Sun Times</CardTitle>
      <StatsGrid columns={2}>
        <StatDisplay
          label="Sunrise"
          value={formatTime(weather.sys.sunrise)}
          size="md"
        />
        <StatDisplay
          label="Sunset"
          value={formatTime(weather.sys.sunset)}
          size="md"
        />
      </StatsGrid>
    </Card>
  );
}
