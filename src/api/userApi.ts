import axios from "axios";
import { api } from "./axios";

export const getUser = async () => {
  try {
    // console.log("🔵 getUser called");
    const response = await api.get("/users/me");
    // console.log("✅ getUser response:", response.data);
    return response.data.data.doc;
  } catch (error: unknown) { // ✅ use unknown instead of any
    console.log("❌ getUser error:", error);

    // ✅ use axios.isAxiosError to check
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};