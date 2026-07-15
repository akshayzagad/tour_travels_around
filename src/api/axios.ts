import axios from "axios"

export const api = axios.create({
  baseURL: "https://natours-web-project.onrender.com/api/v1",
   withCredentials: true
});