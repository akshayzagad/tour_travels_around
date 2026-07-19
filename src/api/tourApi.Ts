import { api } from "./axios";
import type { Tour } from "../../types/tour";

export const getTours = async (filters = {}) => {
  const response = await api.get("/tours", {
    params: filters,
  });

  return response.data;
};

export const getTour = async (id: string) => {
  const { data } = await api.get(`/tours/${id}`);
  return{
    ...data.data.doc as Tour,
    hasBooked: data.data.hasBooked as boolean,
  };
};
