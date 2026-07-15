import { api } from "./axios";

export const signUp = async (userData: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  const { data } = await api.post("users/signup", userData);
  return data;
};

export const login = async (userData: { email: string; password: string }) => {
  const { data } = await api.post("users/login", userData);
  return data;
};
