import { api } from "./axios";
import type { userSignUp, userLogin } from "../../types/user";

export const signUp = async (userData: userSignUp) => {
  const { data } = await api.post("users/signup", userData);
  return data;
};

export const login = async (userData: userLogin) => {
  const { data } = await api.post("users/login", userData);
  return data;
};
