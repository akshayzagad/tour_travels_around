import TourCards from "../component/cards/tourCards";
import type { Tour } from "../../types/tour";
import { useTours } from "../hooks/useTours";
import Filters from "../component/common/Filters";
import { useMemo, useState } from "react";

const Tours = () => {
  const [sort, setSort] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const filters = useMemo(() => {
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
  const { data, isLoading, error } = useTours(filters);
  const tours: Tour[] = data?.data?.data ?? [];
  const handleReset = () => {
    setSort("");
    setDifficulty("");
    setDuration("");
  };
  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong</h2>;
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-500 py-20">
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
          onSortChange={setSort}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          duration={duration}
          onDurationChange={setDuration}
          onReset={handleReset}
        />
      </section>

      {/* Tours Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Popular Tours</h2>
            <p className="mt-2 text-gray-500">Showing 12 amazing adventures</p>
          </div>

          <button className="rounded-full border border-emerald-600 px-6 py-2 font-medium text-emerald-600 transition hover:bg-emerald-600 hover:text-white">
            View All
          </button>
        </div>

        {/* Cards Grid */}
        {/* <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[450px] rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex h-full items-center justify-center text-gray-400">
                Tour Card
              </div>
            </div>
          ))}
        </div> */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour: Tour) => (
            <TourCards key={tour._id} tour={tour} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center gap-3">
          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            Previous
          </button>

          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white">
            1
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            2
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            3
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default Tours;
