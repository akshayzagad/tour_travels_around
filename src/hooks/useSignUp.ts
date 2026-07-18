// hooks/useSignup.ts

import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/autApi";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  return useMutation({
    mutationFn: signUp,

    onSuccess: (data) => {
      console.log("Signup Success", data);
      toast.success("Welcome To our family")
    },

    onError: (error) => {
      console.log("Signup Failed", error);
    },
  });
};