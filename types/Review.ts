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
