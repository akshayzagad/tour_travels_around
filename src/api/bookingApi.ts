import type { MyBookingsResponse } from "../../types/booking";
import { api } from "./axios";

export type BookingTourFilters = Record<string, string | number>;

export const myBookings = async (
  filters: BookingTourFilters = {},
): Promise<MyBookingsResponse> => {
  const { data } = await api.get("/bookings/my-tours", {
    params: filters,
  });
  console.log(data);
  
  return data;
};
