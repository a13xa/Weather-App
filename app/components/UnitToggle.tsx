import { useSearchParams } from "react-router";

export function UnitToggle() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUnit = searchParams.get("units") || "metric";

  const toggleUnit = () => {
    const newUnit = currentUnit === "metric" ? "imperial" : "metric";
    setSearchParams({ units: newUnit });
  };

  return (
    <button
      onClick={toggleUnit}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
    >
      {currentUnit === "metric" ? (
        <>  
          <span className="mr-2">°C</span>
          <span className="text-gray-400">→ °F</span>
        </>
      ) : (
        <>
          <span className="mr-2">°F</span>
          <span className="text-gray-400">→ °C</span>
        </>
      )}
    </button>
  );
}
