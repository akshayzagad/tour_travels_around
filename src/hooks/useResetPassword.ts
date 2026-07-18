// hooks/useSignup.ts

import { useMutation } from "@tanstack/react-query";
import { resetPasswords } from "../api/autApi";
import { toast } from "react-hot-toast";

interface ResetPasswordInput {
  token: string;
  password: string;
  passwordConfirm: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, ...userData }: ResetPasswordInput) =>
      resetPasswords(token, userData),

    onSuccess: (data) => {
      console.log("Signup Success", data);
      toast.success("Password reset Successful");
    },

    onError: (error) => {
      console.log("reset Failed", error);
    },
  });
};
