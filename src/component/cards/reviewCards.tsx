import type { Tour } from "../../../types/tour";
interface ReviewCardsProps {
  tour: Tour;
  userImageBaseUrl: string;
}
export default function reviewCards({
  tour,
  userImageBaseUrl,
}: ReviewCardsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {(tour.reviews ?? []).map((review) => (
        <div key={review._id} className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-4">
            <img
              src={`${userImageBaseUrl}/${review.user?.photo}`}
              alt={review.user?.name ?? "Traveler"}
              className="h-16 w-16 rounded-full bg-slate-300 object-cover"
            />

            <div>
              <h3 className="text-xl font-semibold">
                {review.user?.name ?? "Traveler"}
              </h3>

              <p className="text-yellow-500">Rating {review.rating}/5</p>
            </div>
          </div>

          <p className="leading-8 text-slate-600">{review.review}</p>
        </div>
      ))}
    </div>
  );
}
