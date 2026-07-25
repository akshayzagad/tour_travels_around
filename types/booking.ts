import type { Tour } from "../types/tour";
export interface MyBookingsResponse{
  status: string;
  results: number;
  data: {
    tours: Tour[];
  };
}