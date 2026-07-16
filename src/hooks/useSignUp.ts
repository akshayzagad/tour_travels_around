// hooks/useSignup.ts

import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/autApi";

export const useSignup = () => {
  return useMutation({
    mutationFn: signUp,

    onSuccess: (data) => {
      console.log("Signup Success", data);
    },

    onError: (error) => {
      console.log("Signup Failed", error);
    },
  });
};