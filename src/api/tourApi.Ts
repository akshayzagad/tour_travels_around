import { api } from "./axios";

export const getTours = async (filters = {}) =>{
    const response = await api.get("/tours",{
      params: filters,
    });

  return response.data;
}