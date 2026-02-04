import type { Route } from "./+types/api.search-cities";
import { searchCities } from "../lib/geocoding.server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query || query.length < 1) {
    return Response.json([]);
  }

  const results = await searchCities(query);

  return Response.json(results);
}
