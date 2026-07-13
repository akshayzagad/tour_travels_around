import {
  CalendarDays,
  MapPin,
  Users,
  Flag,
  Star,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Tour } from "../../../types/tour";

interface TourCardProps {
  tour: Tour;
}

const formatDate = (date?: string) => {
  if (!date) return "Date coming soon";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const TourCards = ({ tour }: TourCardProps) => {
  const imageUrl = `${import.meta.env.VITE_API_URL}/img/tours/${tour.imageCover}`;
  const difficulty =
    tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1);
  const startDate = formatDate(tour.startDates?.[0]);
  const stops = tour.locations?.length ?? 0;

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Difficulty */}
        <span className="absolute left-5 top-5 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
          {difficulty}
        </span>

        {/* Duration */}
        <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-gray-800 backdrop-blur">
          <Clock3 size={15} />
          {tour.duration} Days
        </span>

        {/* Rating */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold text-gray-900">
          <Star size={15} fill="currentColor" />
          {tour.ratingsAverage}
        </div>

        {/* Title */}
        <div className="absolute bottom-6 left-6">
          <h2 className="text-3xl font-bold text-white">{tour.name}</h2>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        <p className="leading-7 text-gray-600">{tour.summary}</p>

        {/* Tour Info */}
        <div className="grid grid-cols-2 gap-5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="text-emerald-500" size={18} />
            {tour.startLocation?.description ?? "Location coming soon"}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="text-emerald-500" size={18} />
            {startDate}
          </div>

          <div className="flex items-center gap-2">
            <Flag className="text-emerald-500" size={18} />
            {stops} Stops
          </div>

          <div className="flex items-center gap-2">
            <Users className="text-emerald-500" size={18} />
            {tour.maxGroupSize} People
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-5">
          <div>
            <h3 className="text-3xl font-bold text-emerald-600">
              ${tour.price}
            </h3>
            <p className="text-sm text-gray-500">per person</p>
          </div>
          <Link to={`/tourDetail/${tour._id}`}>
          <button className="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg">
            View Details
          </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default TourCards;
