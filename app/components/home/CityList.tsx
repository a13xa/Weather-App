import { Form } from "react-router";
import type { DatabaseCity } from "../../lib/types";
import { getCountryName } from "../../lib/countries";

interface CityListProps {
  cities: DatabaseCity[];
}

export function CityList({ cities }: CityListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-700">
          Saved Locations
        </label>
        <span className="text-xs text-gray-500">
          {cities.length} {cities.length === 1 ? 'city' : 'cities'}
        </span>
      </div>
      <div className="space-y-1 max-h-[calc(100vh-24rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 hover:scrollbar-thumb-blue-500 pr-1">
        {cities.map((city) => (
          <div
            key={city.id}
            className="flex items-center justify-between p-2.5 rounded hover:bg-gray-50 group"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm truncate">{city.name}</p>
              {city.country && (
                <p className="text-xs text-gray-500 truncate">{getCountryName(city.country)}</p>
              )}
            </div>
            <Form method="post">
              <input type="hidden" name="intent" value="delete" />
              <input type="hidden" name="id" value={city.id} />
              <button
                type="submit"
                className="ml-2 p-1 text-gray-400 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  if (!confirm(`Delete ${city.name}?`)) {
                    e.preventDefault();
                  }
                }}
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
}
