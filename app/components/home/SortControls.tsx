interface SortControlsProps {
  sortBy: "name" | "country" | "temp-high" | "temp-low" | null;
  onSortToggle: (sortOption: "name" | "country" | "temp-high" | "temp-low") => void;
}

export function SortControls({ sortBy, onSortToggle }: SortControlsProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSortToggle("name")}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            sortBy === "name"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          City
        </button>
        <button
          type="button"
          onClick={() => onSortToggle("country")}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            sortBy === "country"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Country
        </button>
        <button
          type="button"
          onClick={() => onSortToggle("temp-high")}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            sortBy === "temp-high"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Temp ↓
        </button>
        <button
          type="button"
          onClick={() => onSortToggle("temp-low")}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            sortBy === "temp-low"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Temp ↑
        </button>
      </div>
    </div>
  );
}
