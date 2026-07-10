import { useEffect, useState } from "react";
import { useTours } from "../hooks/useTours";
import { AnimatePresence, motion } from "framer-motion";
const Home = () => {
  const { data, isLoading, error } = useTours();

  const tours = data?.data?.data ?? [];

  console.log(data);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!tours.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tours.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tours]);

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong</h2>;

  return (
    <section
      className="relative h-[90vh] bg-cover bg-center"
      // style={{
      //   backgroundImage: `url(${import.meta.env.VITE_API_URL}/img/tours/${tours[currentIndex].imageCover})`,
      // }}
    >
       {/* Background Image */}
  <AnimatePresence initial={false}>
    <motion.img
      key={tours[currentIndex]?.imageCover}
      src={`${import.meta.env.VITE_API_URL}/img/tours/${tours[currentIndex]?.imageCover}`}
      className="absolute inset-0 h-full w-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
       transition={{
    duration: 1.5,
    ease: "easeInOut",
  }}
    />
  </AnimatePresence>
      {/* Overlay  */}
      
      <div className="absolute inset-0 bg-black/50"></div>
        
      {/* Content  */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl text-white">
          <p className="mb-3 text-lg font-medium uppercase tracking-[4px] text-emerald-400">
            Explore the World
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Discover Your Next
            <span className="text-emerald-400"> Adventure</span>
          </h1>

          <p className="mb-8 text-lg leading-8 text-gray-200">
            Find unforgettable travel experiences, breathtaking destinations,
            and carefully crafted tours designed for every traveler.
          </p>

          {/* Search  */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-xl md:flex-row">
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-emerald-500"
            />

            <button className="rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Search
            </button>
          </div>

          {/* Buttons  */}
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700">
              Explore Tours
            </button>

            <button className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
