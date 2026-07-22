import type { Tour } from "../../types/tour";
import { api } from "./axios";

export type BookingTourFilters = Record<string, string | number>;

export const myBookings = async (
  filters: BookingTourFilters = {},
): Promise<Tour[]> => {
  const { data } = await api.get("/bookings/my-tours", {
    params: filters,
  });

  return data.data.tours;
};
