import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReviews } from "../api/reviewsApi";
import { toast } from "react-hot-toast";

export const useUpdateReviews = () => {
  const queryClient = useQueryClient();
  const { mutate: updateReview, isPending: isUpdatingReview } = useMutation({
    mutationFn: updateReviews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["tour"] });
      toast.success("Update Review Success");
    },

    onError: (error) => {
      console.log("Update Review Success", error);
    },
  });
  return { updateReview, isUpdatingReview };
};
