import type { TourReview } from "../../../types/tour";

interface ReviewCardsProps {
  reviews: TourReview[];
  userImageBaseUrl: string;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function ReviewCards({
  reviews,
  userImageBaseUrl,
}: ReviewCardsProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-800">No reviews yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Be the first traveler to share an experience.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
      {reviews.map((review) => {
        const reviewerName = review.user?.name ?? "Traveler";
        const filledStars = Math.round(review.rating);

        return (
          <article
            key={review._id}
            className="group relative flex min-h-56 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl sm:p-7"
          >
            <div className="absolute right-5 top-3 font-serif text-7xl leading-none text-emerald-100 transition group-hover:text-emerald-200">
              &ldquo;
            </div>

            <div className="relative flex items-center gap-4">
              {review.user?.photo ? (
                <img
                  src={`${userImageBaseUrl}/${review.user.photo}`}
                  alt={reviewerName}
                  className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-md ring-2 ring-emerald-50"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 font-bold text-white shadow-md">
                  {getInitials(reviewerName)}
                </div>
              )}

              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-slate-900">
                  {reviewerName}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="text-sm tracking-wide text-amber-400"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= filledStars ? "" : "text-slate-200"}>
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <p className="relative mt-6 flex-1 text-[15px] leading-7 text-slate-600">
              {review.review}
            </p>

            <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
              <span>Verified traveler</span>
              <time dateTime={review.createdAt}>
                {new Intl.DateTimeFormat("en", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(review.createdAt))}
              </time>
            </div>
          </article>
        );
      })}
    </div>
  );
}
