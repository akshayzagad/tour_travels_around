import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviews } from "../api/reviewsApi";
import { toast } from "react-hot-toast";

export const useCreateReviews = () => {
    const queryClient = useQueryClient()
  const {mutate:createReview,isPending:isCreateReview} = useMutation({
    mutationFn: createReviews,
    onSuccess:()=>{
            toast.success("Review Succsesfully Created");
            // queryClient.setQueryData(["user"],user);
            queryClient.invalidateQueries({queryKey:["review"]});
        },
        onError:(err)=>toast.error(err.message) 
  });
  return {createReview,isCreateReview}
};
