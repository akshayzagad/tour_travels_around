import type { TourSummary, TourReview } from "./tour";

export interface Review extends TourReview {
  tour: TourSummary;
}

export interface ReviewTour {
  _id: string;
  name: string;
  slug: string;
  imageCover: string;
}

export interface createReview {
  review:string;
  rating:number;
}

export interface CreateReviewPayload {
  tourId: string;
  review: string;
  rating: number;
}
export interface UpdateReviewPayload {
  reviewId: string;
  review: string;
  rating: number;
}