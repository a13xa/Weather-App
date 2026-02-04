import { Form, useFetcher } from "react-router";
import type { DatabaseCity } from "../../lib/types";
import { SearchInput } from "./SearchInput";
import { CityList } from "./CityList";

interface CityManagementSidebarProps {
  cities: DatabaseCity[];
  actionData?: { error?: string };
  isSubmitting: boolean;
}

export function CityManagementSidebar({
  cities,
  actionData,
  isSubmitting,
}: CityManagementSidebarProps) {
  const fetcher = useFetcher();

  const handleCityAdd = async (cityName: string, countryCode: string) => {
    const formData = new FormData();
    formData.append("intent", "add");
    formData.append("cityName", cityName);
    formData.append("countryCode", countryCode);

    fetcher.submit(formData, { method: "post" });
  };

  const isAdding = fetcher.state === "submitting";

  return (
    <aside className="fixed left-0 top-28 h-[calc(100vh-7rem)] w-80 bg-white border-r border-gray-200 shadow-sm">
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Manage Cities
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Add or remove locations
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-900">
                  Add New Location
                </h3>
              </div>

              {actionData?.error && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {actionData.error}
                </div>
              )}
              {fetcher.data?.error && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {fetcher.data.error}
                </div>
              )}

              <SearchInput onCityAdd={handleCityAdd} isAdding={isAdding} />
            </div>

            <div className="my-6 border-t border-gray-200"></div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-900">
                  Your Locations ({cities.length})
                </h3>
              </div>
              <CityList cities={cities} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
