import { useNavigate, useParams } from "react-router-dom";
import { useTour } from "../hooks/useTours";
import type { Tour, TourLocation } from "../../types/tour";
import Map from "../component/common/Map";
import ReviewCards from "../component/cards/reviewCards";
import GuideCard from "../component/cards/guideCard";
import BookTourButton from "../component/common/BookTourButton";
import { useUser } from "../hooks/useUser";
import { useCheckout } from "../hooks/useCheckout ";

const imageBaseUrl = `${import.meta.env.VITE_API_URL}/img/tours`;
const userImageBaseUrl = `${import.meta.env.VITE_API_URL}/img/users`;

const formatDifficulty = (difficulty?: string) => {
  if (!difficulty) return "Not specified";

  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

const formatDate = (date?: string) => {
  if (!date) return "Date coming soon";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const getTourStops = (locations?: TourLocation[], location?: TourLocation[]) =>
  locations?.length ? locations : (location ?? []);

type TourApiWrapper = {
  data?: {
    doc?: Tour;
  };
};

const getTourDoc = (value?: Tour | TourApiWrapper): Tour | undefined => {
  if (!value) return undefined;

  const wrappedDoc = (value as TourApiWrapper).data?.doc;

  return wrappedDoc ?? (value as Tour);
};

const TourDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user } = useUser();
  const { data, isPending, error } = useTour(id!);
  const tour = getTourDoc(data);
  const { mutate: checkout, isPending: isBooking } = useCheckout();
  // console.log(data);
  const handleBookTour = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    checkout(id!, {
      onSuccess: (data) => {
        window.location.href = data.session.authorization_url;
      },
    });
  };

  if (isPending) return <h2 className="p-6">Loading...</h2>;
  if (error) return <h2 className="p-6">Something went wrong</h2>;
  if (!tour) return <h2 className="p-6">Tour not found</h2>;

  const difficulty = formatDifficulty(tour.difficulty);
  const heroImage = tour.imageCover
    ? `${imageBaseUrl}/${tour.imageCover}`
    : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
  const galleryImages = [tour.imageCover, ...(tour.images ?? [])].filter(
    (image): image is string => Boolean(image),
  );
  const stops = getTourStops(tour.locations, tour.location);
  const descriptionParagraphs = (tour.description ?? "")
    .split("\n")
    .filter((paragraph) => paragraph.trim().length > 0);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative h-[75vh] overflow-hidden">
        <img
          src={heroImage}
          alt={tour.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 text-white">
            <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold">
              {difficulty} Tour
            </span>

            <h1 className="mt-6 text-5xl font-bold lg:text-7xl">
              {tour.name ?? "Tour Details"}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-200">
              {tour.summary ?? "Explore this unforgettable tour experience."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                Rating {tour.ratingsAverage} ({tour.ratingsQuantity} Reviews)
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                {tour.startLocation?.description ?? "Location coming soon"}
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                {tour.duration ?? 0} Days
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                {tour.maxGroupSize ?? 0} People
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                {difficulty}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="mb-8 text-4xl font-bold text-slate-900">
              Tour Overview
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Price</p>
                <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                  ${tour.price ?? 0}
                </h3>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Duration</p>
                <h3 className="mt-2 text-2xl font-bold">
                  {tour.duration ?? 0} Days
                </h3>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Difficulty</p>
                <h3 className="mt-2 text-2xl font-bold">{difficulty}</h3>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Max Group</p>
                <h3 className="mt-2 text-2xl font-bold">
                  {tour.maxGroupSize ?? 0} People
                </h3>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Rating</p>
                <h3 className="mt-2 text-2xl font-bold">
                  {tour.ratingsAverage ?? 0}
                </h3>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Reviews</p>
                <h3 className="mt-2 text-2xl font-bold">
                  {tour.ratingsQuantity ?? 0}
                </h3>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="mb-6 text-4xl font-bold text-slate-900">
                About This Tour
              </h2>

              <div className="rounded-3xl bg-white p-8 shadow">
                <h3 className="text-2xl font-semibold">Summary</h3>

                <p className="mt-4 text-lg leading-8 text-slate-600">
                  {tour.summary ?? "Summary coming soon."}
                </p>

                <div className="my-8 h-px bg-slate-200" />

                <h3 className="text-2xl font-semibold">Description</h3>

                {descriptionParagraphs.length > 0 ? (
                  descriptionParagraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 leading-8 text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mt-4 leading-8 text-slate-600">
                    Description coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="mb-6">
                <p className="text-slate-500">Starting From</p>

                <h2 className="mt-2 text-5xl font-bold text-emerald-600">
                  ${tour.price ?? 0}
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between gap-6">
                  <span>Duration</span>
                  <strong>{tour.duration ?? 0} Days</strong>
                </div>

                <div className="flex justify-between gap-6">
                  <span>Difficulty</span>
                  <strong>{difficulty}</strong>
                </div>

                <div className="flex justify-between gap-6">
                  <span>Group Size</span>
                  <strong>{tour.maxGroupSize ?? 0} People</strong>
                </div>

                <div className="flex justify-between gap-6">
                  <span>Rating</span>
                  <strong>{tour.ratingsAverage ?? 0}</strong>
                </div>

                <div className="flex justify-between gap-6">
                  <span>Location</span>
                  <strong>
                    {tour.startLocation?.description ?? "Coming soon"}
                  </strong>
                </div>
              </div>

              <BookTourButton
                user={user}
                isLoading={isBooking}
                onClick={handleBookTour}
                className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700"
              />

              <p className="mt-5 text-center text-sm text-slate-500">
                No hidden charges. Instant confirmation.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900">Tour Gallery</h2>
          <p className="mt-3 text-slate-500">
            A glimpse of the unforgettable places you'll explore.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`overflow-hidden rounded-3xl ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <img
                src={`${imageBaseUrl}/${image}`}
                alt={`${tour.name ?? "Tour"} gallery ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Tour Itinerary
            </h2>

            <p className="mt-4 text-slate-500">
              Discover each stop of your journey.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl border-l-4 border-emerald-500 pl-10">
            {stops.map((stop, index) => (
              <div key={stop._id} className="relative mb-12 last:mb-0">
                <span className="absolute -left-[53px] flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                  {stop.day ?? index + 1}
                </span>

                <div className="rounded-2xl bg-slate-50 p-6 shadow">
                  <h3 className="text-xl font-semibold">
                    Day {stop.day ?? index + 1}
                  </h3>

                  <p className="mt-2 text-slate-600">{stop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900">Upcoming Dates</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(tour.startDates ?? []).map((date) => (
            <div
              key={date}
              className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold">{formatDate(date)}</h3>

              <p className="mt-2 text-slate-500">Seats available</p>

              <button className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-white">
                Reserve
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Meet Your Guides
            </h2>

            <p className="mt-3 text-slate-500">
              Experienced professionals who will make your trip unforgettable.
            </p>
          </div>

          {tour.guides && tour.guides.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {(tour.guides ?? []).map((guide) => (
                <GuideCard
                  key={guide._id}
                  guide={guide}
                  userImageBaseUrl={userImageBaseUrl}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-12 shadow text-center text-slate-600">
              No guides are assigned to this tour yet.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900">Tour Route</h2>

          <p className="mt-3 text-slate-500">
            Explore the locations you'll visit during this amazing journey.
          </p>
        </div>

        <div className="h-[500px] overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-100">
          {/* <div className="text-center">
            <div className="mb-4 text-6xl">Map</div>

            <h3 className="text-2xl font-semibold text-slate-700">
              Map will be displayed here
            </h3>

            <p className="mt-2 text-slate-500">
              React Leaflet / Google Maps Integration
            </p>
          </div> */}

          <Map
            coordinates={
              tour.startLocation?.coordinates as [number, number] | undefined
            }
            location={tour.location}
          />
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Traveler Reviews
            </h2>

            <p className="mt-4 text-slate-500">
              See what travelers are saying about this tour.
            </p>
          </div>

          <ReviewCards tour={tour} userImageBaseUrl={userImageBaseUrl} />
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-emerald-600 to-emerald-500 p-16 text-center text-white shadow-2xl">
            <h2 className="text-5xl font-bold">
              Ready for {tour.name ?? "your next adventure"}?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-emerald-100">
              Book today and create unforgettable memories from just $
              {tour.price ?? 0} per person.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <BookTourButton
                user={user}
                isLoading={isBooking}
                onClick={handleBookTour}
                className="rounded-xl bg-white px-10 py-4 text-lg font-semibold text-emerald-600 transition hover:scale-105"
              />

              <button className="rounded-xl border border-white px-10 py-4 text-lg font-semibold transition hover:bg-white hover:text-emerald-600">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TourDetails;
