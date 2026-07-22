import { useQuery } from "@tanstack/react-query";
import { myBookings, type BookingTourFilters } from "../api/bookingApi";
import type { Tour } from "../../types/tour";

export const useMyBooking = (filters: BookingTourFilters = {}) => {
  return useQuery<Tour[]>({
    queryKey: ["my-bookings", filters],
    queryFn: () => myBookings(filters),
  });
};
