import { api } from "./axios";

export const getCheckoutSession = async (tourId: string) => {
  const { data } = await api.get(`/bookings/checkout-session/${tourId}`);

  return data;
};