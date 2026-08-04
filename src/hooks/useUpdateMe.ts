import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser } from "../api/userApi";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  const { mutate: updateMe, isPending: isUpdatingMe } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Update User Success");
    },

    onError: (error) => {
      console.error("Update user failed", error);
    },
  });
  return { updateMe, isUpdatingMe };
};
