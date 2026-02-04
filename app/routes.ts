import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("weather/:city", "routes/weather.$city.tsx"),
  route("api/search-cities", "routes/api.search-cities.ts"),
];
