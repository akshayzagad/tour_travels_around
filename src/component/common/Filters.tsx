interface FiltersProps {
  sort: string;
  onSortChange: (value: string) => void;
  difficulty: string;
  onDifficultyChange: (value: string) => void;
  duration: string;
  onDurationChange: (value: string) => void;
  onReset: () => void;
}

const Filters = ({
  sort,
  onSortChange,
  difficulty,
  onDifficultyChange,
  duration,
  onDurationChange,
  onReset,
}: FiltersProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <input
            type="text"
            placeholder="Search destination..."
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>

          <select
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="">All Durations</option>
            <option value="1-5">1 - 5 Days</option>
            <option value="5-10">5 - 10 Days</option>
            <option value="10+">10+ Days</option>
          </select>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-ratingsAverage">Highest Rated</option>
            <option value="-createdAt">Newest</option>
          </select>

          <button
            type="button"
            onClick={onReset}
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
export default Filters;
