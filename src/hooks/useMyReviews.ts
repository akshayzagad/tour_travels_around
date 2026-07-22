import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../api/reviewsApi";

export const useMyReviews = () => {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  });
};