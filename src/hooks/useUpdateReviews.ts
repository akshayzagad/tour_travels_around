import { useMutation } from "@tanstack/react-query";
import { updateReviews } from "../api/reviewsApi";
import { toast } from "react-hot-toast";

export const useUpdateReviews = () => {
    const {mutate:updateReview,isPending:UpdatingReview} = useMutation({
        mutationFn:updateReviews,
        onSuccess: () => {
      toast.success("Update Review Success")
    },

    onError: (error) => {
      console.log("Update Review Success", error);
    },
    })
    return{updateReview,UpdatingReview}
}