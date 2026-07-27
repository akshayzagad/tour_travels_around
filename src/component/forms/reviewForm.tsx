import { useEffect, useState } from "react";
import { X, Star } from "lucide-react";
import { useCreateReviews } from "../../hooks/useCreateReviews";
import { useParams } from "react-router-dom";
import type { TourReview } from "../../../types/tour";
import { useUpdateReviews } from "../../hooks/useUpdateReviews";

type ReviewFormProps = {
  onClose: () => void;
  mode: "create" | "edit";
  reviewToEdit?: TourReview | null;
};

const ReviewForm = ({ onClose, mode, reviewToEdit }: ReviewFormProps) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const { createReview, isCreateReview } = useCreateReviews();
  const { updateReview, isUpdatingReview } = useUpdateReviews();
  const { id } = useParams();

  const isSubmitting = mode === "edit" ? isUpdatingReview : isCreateReview;

  useEffect(() => {
    setRating(reviewToEdit?.rating ?? 1);
    setReview(reviewToEdit?.review ?? "");
  }, [reviewToEdit, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "edit") {
      if (!reviewToEdit) return;

      updateReview({
        reviewId: reviewToEdit._id,
        rating,
        review,
      });

      return;
    }

    if (!id) return;

    createReview({
      tourId: id,
      rating,
      review,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Share Your Experience
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition hover:scale-110"
                >
                  <Star
                    size={32}
                    fill={star <= rating ? "#FACC15" : "none"}
                    color="#FACC15"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Review
            </label>

            <textarea
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell others about your experience..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              {isSubmitting
                ? mode === "edit"
                  ? "Saving..."
                  : "Submitting..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
