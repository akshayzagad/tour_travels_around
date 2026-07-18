import { useMutation } from "@tanstack/react-query";
import { forgotPasswords } from "../api/autApi";
import { toast } from "react-hot-toast";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswords,
    onSuccess: (data) => {
      console.log("Passwor Reset Success", data);
      toast.success("Please Check your spam mail to rest password!")
    },

    onError: (error) => {
      console.log("Passwor Reset", error);
    },
  });
};
