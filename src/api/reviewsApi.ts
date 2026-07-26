import type { CreateReviewPayload, Review, UpdateReviewPayload } from "../../types/Review";
import { api } from "./axios";

export const getMyReviews = async (): Promise<Review[]> => {
  const { data } = await api.get("/reviews/my-reviews");

  return data.data.reviews;
};

export const createReviews = async ({
  tourId,
  review,
  rating,
}: CreateReviewPayload) => {
  const { data } = await api.post(`/tours/${tourId}/reviews`, {
    review,
    rating,
  });
  return data;
};

export const updateReviews = async ({
  reviewId,
  review,
  rating,
}: UpdateReviewPayload) => {
  const { data } = await api.patch(`/tours/reviews/${reviewId}`, {
    review,
    rating,
  });
  return data;
};

export const deleteReviews = async () => {};
