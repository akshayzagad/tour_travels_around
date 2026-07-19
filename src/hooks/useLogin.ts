import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/autApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // console.log("Login Success", data);
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      // slight delay ensures Supabase session is available
      setTimeout(() => {
        navigate("/tours", { replace: true });
      }, 300);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      console.log(error);
    },
  });
};
