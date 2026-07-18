import { useMutation } from "@tanstack/react-query";
import { getCheckoutSession } from "../api/paymentApi";

export const useCheckout = () => {
  return useMutation({
    mutationFn: getCheckoutSession,
  });
};