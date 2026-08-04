import axios from "axios";
import { api } from "./axios";
import type { updateMe } from "../../types/user";

export const getUser = async () => {
  try {
    // console.log("🔵 getUser called");
    const response = await api.get("/users/me");
    // console.log("✅ getUser response:", response.data);
    return response.data.data.doc;
  } catch (error: unknown) {
    // ✅ use unknown instead of any
    console.log("❌ getUser error:", error);

    // ✅ use axios.isAxiosError to check
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const updateUser = async (meData: updateMe) => {
  try {
    const formData = new FormData();

    formData.append("name", meData.name);
    formData.append("email", meData.email);

    if (meData.photo) {
      formData.append("photo", meData.photo);
    }
    const {data} = await api.patch("/users/updateMe", formData);
    // console.log("✅ getUser response:", response.data);
    return data;
  } catch (error: unknown) {
    // ✅ use unknown instead of any
    console.log("❌ update error:", error);

    // ✅ use axios.isAxiosError to check
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
