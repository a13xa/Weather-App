import * as React from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface SearchInputProps {
  onCityAdd: (cityName: string, countryCode: string) => Promise<void>;
  isAdding: boolean;
}

export function SearchInput({ onCityAdd, isAdding }: SearchInputProps) {
  const [cityName, setCityName] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!countryCode.trim()) {
      setError("Please enter a country code (e.g., US, GB, or USA, GBR)");
      return;
    }

    try {
      await onCityAdd(cityName.trim(), countryCode.trim().toUpperCase());
      // Clear form on success
      setCityName("");
      setCountryCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add city");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            City Name
          </label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
              setError("");
            }}
            placeholder="e.g., London"
            disabled={isAdding}
            className="w-full px-3 py-2 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 transition-all disabled:opacity-50 disabled:bg-gray-50"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Country Code
          </label>
          <input
            type="text"
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="e.g., GB or GBR"
            disabled={isAdding}
            maxLength={3}
            className="w-full px-3 py-2 border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400 transition-all disabled:opacity-50 disabled:bg-gray-50 uppercase"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isAdding || !cityName.trim() || !countryCode.trim()}
          className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
        >
          {isAdding ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add City</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 px-2.5 py-2 rounded border border-red-200">
          {error}
        </div>
      )}
    </form>
  );
}
