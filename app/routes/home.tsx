import type { Route } from "./+types/home";
import { redirect, useRevalidator, useNavigation, useRouteError, isRouteErrorResponse } from "react-router";
import * as React from "react";
import { getWeatherByCoords } from "../lib/weather.server";
import { City } from "../components/City";
import { getCities, initDatabase, addCity, deleteCity } from "../lib/db.server";
import { WEATHER_AUTO_REFRESH } from "../lib/constants";
import { getCountryName } from "../lib/countries";
import { searchCities } from "../lib/geocoding.server";
import { CityManagementSidebar } from "../components/home/CityManagementSidebar";
import { WeatherHeader } from "../components/home/WeatherHeader";
import { SortControls } from "../components/home/SortControls";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add") {
    const cityName = formData.get("cityName") as string;
    const countryCode = formData.get("countryCode") as string;

    if (!cityName || !countryCode) {
      return { error: "Please enter both city name and country code." };
    }

    const query = `${cityName},${countryCode}`;
    const results = await searchCities(query);

    if (!results || results.length === 0) {
      return { error: `City "${cityName}" not found in "${countryCode}". Check spelling or try a different country code.` };
    }

    const cityData = results[0];

    const weatherData = await getWeatherByCoords(cityData.lat, cityData.lon, "metric");

    if (!weatherData) {
      return { error: "Weather data not available for this location." };
    }

    await addCity(
      cityName,
      countryCode,
      cityData.lat,
      cityData.lon
    );
  } else if (intent === "delete") {
    const id = formData.get("id");
    if (id) {
      await deleteCity(parseInt(id as string));
    }
  }

  return redirect(request.url);
}

export async function loader({ request }: Route.LoaderArgs) {
  await initDatabase();

  const url = new URL(request.url);
  const units = (url.searchParams.get("units") as "metric" | "imperial") || "metric";

  const dbCities = await getCities();

  const weatherResults = await Promise.allSettled(
    dbCities.map(city =>
      getWeatherByCoords(city.lat, city.lon, units)
    )
  );

  const weatherData = weatherResults
    .map((result, index) => {
      if (result.status === "fulfilled" && result.value !== null) {
        const dbCity = dbCities[index];
        return {
          ...result.value,
          name: dbCity.name,
          sys: {
            ...result.value.sys,
            country: dbCity.country || result.value.sys.country,
          },
        };
      }
      return null;
    })
    .filter((city): city is NonNullable<typeof city> => city !== null);

  const failedCities = weatherResults.map((r, i) => r.status === "rejected" ? dbCities[i].name : null).filter(Boolean);
  if (failedCities.length > 0) {
    console.warn('Failed to fetch weather for cities:', failedCities);
  }
  return { cities: weatherData, units, dbCities };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { cities, dbCities } = loaderData;
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const [sortBy, setSortBy] = React.useState<"name" | "country" | "temp-high" | "temp-low" | null>(null);

  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";
  const isRevalidating = revalidator.state === "loading";

  const handleSortToggle = (sortOption: "name" | "country" | "temp-high" | "temp-low") => {
    setSortBy(current => current === sortOption ? null : sortOption);
  };

  const sortedCities = React.useMemo(() => {
    const sorted = [...cities];
    if (!sortBy) {
      return sorted;
    }
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "country":
        return sorted.sort((a, b) => {
          const countryA = getCountryName(a.sys?.country);
          const countryB = getCountryName(b.sys?.country);
          return countryA.localeCompare(countryB);
        });
      case "temp-high":
        return sorted.sort((a, b) => b.main.temp - a.main.temp);
      case "temp-low":
        return sorted.sort((a, b) => a.main.temp - b.main.temp);
      default:
        return sorted;
    }
  }, [cities, sortBy]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing weather data...');
      revalidator.revalidate();
    }, WEATHER_AUTO_REFRESH);

    return () => clearInterval(interval);
  }, [revalidator]);

  return (
    <div className="min-h-screen bg-gray-50">
      {(isLoading || isRevalidating) && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50 animate-pulse" />
      )}

      <CityManagementSidebar
        cities={dbCities}
        actionData={actionData}
        isSubmitting={isSubmitting}
      />

      <WeatherHeader cityCount={cities.length} isRevalidating={isRevalidating} />

      <div className="ml-80 mt-24">
        <main className="p-6">
          <SortControls sortBy={sortBy} onSortToggle={handleSortToggle} />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {sortedCities.map((city) => (
              <City key={`${city.coord.lat}-${city.coord.lon}`} data={city} />
            ))}
          </div>
        </main>

        <footer className="border-t border-gray-200 mt-16">
          <div className="px-8 py-6">
            <p className="text-xs text-gray-500">
              Data from OpenWeatherMap API
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred";
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetails = error.data?.message || "";
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || "";
  }

  console.error("Route Error:", error);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white border border-red-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-red-600 mb-4">{errorMessage}</p>

            {errorDetails && (
              <details className="mb-6">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 mb-2">
                  Technical details
                </summary>
                <pre className="bg-gray-50 border border-gray-200 rounded p-4 text-xs overflow-x-auto text-gray-700">
                  {errorDetails}
                </pre>
              </details>
            )}

            <div className="flex gap-3">
              <a
                href="/"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium"
              >
                Go back home
              </a>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
