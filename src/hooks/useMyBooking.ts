import { useQuery } from "@tanstack/react-query";
import { myBookings, type BookingTourFilters } from "../api/bookingApi";
import type { MyBookingsResponse } from "../../types/booking";

export const useMyBooking = (filters: BookingTourFilters = {}) => {
  return useQuery<MyBookingsResponse>({
    queryKey: ["my-bookings", filters],
    queryFn: () => myBookings(filters),
  });
};
