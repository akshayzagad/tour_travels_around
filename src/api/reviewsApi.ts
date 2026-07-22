import type { Review } from "../../types/Review";
import { api } from "./axios";

export const getMyReviews = async (): Promise<Review[]> => {
  const { data } = await api.get("/reviews/my-reviews");
  
  return data.data.reviews;
};