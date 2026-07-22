import { useMemo, useState } from "react";
import TourCards from "../component/cards/tourCards";
import Filters from "../component/common/Filters";
import { useMyBooking } from "../hooks/useMyBooking";

const MyBookingDetails = () => {

  const [sort, setSort] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;

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

  const {
    data: tours,
    isPending,
    isError,
  } = useMyBooking(filters);

  if (isPending) {
    return <p className="p-8 text-center">Loading your bookings...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-center text-red-600">
        Unable to load your bookings.
      </p>
    );
  }
    console.log(tours);
    
  return (
    <main className="min-h-[calc(100vh-18rem)] bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Your travel stories
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-3 text-slate-600">
            View the tours you have booked and prepare for your next journey.
          </p>
        </div>
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
        {tours && tours.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => (
              <TourCards key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-slate-500">
              Explore our tours and book your next adventure.
            </p>
          </div>
        )}
        
      </section>
    </main>
  )
}

export default MyBookingDetails
