import { api } from "./axios";

export const getTours = async () =>{
    const response = await api.get("/tours");

  return response.data;
}