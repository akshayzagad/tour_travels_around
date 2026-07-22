import TourCards from "../component/cards/tourCards";
import type { Tour } from "../../types/tour";
import { useTours } from "../hooks/useTours";
import Filters from "../component/common/Filters";
import { useMemo, useState } from "react";
import Pagination from "../component/common/Pagination";

const Tours = () => {
  const [sort, setSort] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const baseFilters = useMemo(() => {
    const params: Record<string, string | number> = {};

    if (sort) params.sort = sort;
    if (difficulty) params.difficulty = difficulty;

    // duration is a range in the UI, but your backend expects
    // bracket-notation keys like duration[gte]=5&duration[lte]=10
    // so it can be parsed by `qs` and converted to $gte/$lte
    if (duration === "1-5") {
      params["duration[gte]"] = 1;
      params["duration[lte]"] = 5;
    } else if (duration === "5-10") {
      params["duration[gte]"] = 5;
      params["duration[lte]"] = 10;
    } else if (duration === "10+") {
      params["duration[gte]"] = 10;
    }

    return params;
  }, [sort, difficulty, duration]);

  const filters = useMemo(
    () => ({
      ...baseFilters,
      page,
      limit,
    }),
    [baseFilters, page, limit],
  );

  // useEffect(() => {
  //   setPage(1);
  // }, [sort, difficulty, duration]);

  const { data, isLoading, error } = useTours(filters);
  const { data: totalData } = useTours(baseFilters);
  // console.log(totalData);

  const tours: Tour[] = data?.data?.data ?? [];
  const totalResults = totalData?.results ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalResults / limit));

  // useEffect(() => {
  //   if (page > totalPages) setPage(totalPages);
  // }, [page, totalPages]);

  // console.log(tours);

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    setPage(1);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    setPage(1);
  };

  const handleReset = () => {
    setSort("");
    setDifficulty("");
    setDuration("");
    setPage(1);
  };

  
  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong</h2>;
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-emerald-700 to-emerald-500 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-white">
          <p className="mb-3 uppercase tracking-[4px] text-emerald-100">
            Discover
          </p>

          <h1 className="mb-5 text-5xl font-bold">Explore Amazing Tours</h1>

          <p className="mx-auto max-w-2xl text-lg text-emerald-50">
            Find unforgettable adventures, breathtaking destinations, and
            experiences crafted for every traveler.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="-mt-10">
        <Filters
          sort={sort}
          onSortChange={handleSortChange}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          duration={duration}
          onDurationChange={handleDurationChange}
          onReset={handleReset}
        />
      </section>

      {/* Tours Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Popular Tours</h2>
            <p className="mt-2 text-gray-500">
              Showing {tours.length} of {totalResults} amazing adventures
            </p>
          </div>

          <button className="rounded-full border border-emerald-600 px-6 py-2 font-medium text-emerald-600 transition hover:bg-emerald-600 hover:text-white">
            View All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour: Tour) => (
            <TourCards key={tour._id} tour={tour} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center gap-3">
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </main>
  );
};

export default Tours;
