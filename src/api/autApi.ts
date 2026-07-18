import { api } from "./axios";
import type { userSignUp, userLogin, forgotPassword, resetPassword } from "../../types/user";

export const signUp = async (userData: userSignUp) => {
  const { data } = await api.post("users/signup", userData);
  return data;
};

export const login = async (userData: userLogin) => {
  const { data } = await api.post("users/login", userData);
  return data;
};

export const forgotPasswords = async (userData: forgotPassword) =>{
  const {data} = await api.post("users/forgotPassword",userData);
  return data;
}

export const resetPasswords = async (token: string,userData: resetPassword) =>{
  const {data} = await api.patch(`users/resetPassword/${token}`,userData);
  return data;
}

export const logout = async () => {
  const response = await api.get("/users/logout");
  return response.data;
};