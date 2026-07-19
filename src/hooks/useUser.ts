import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/userApi";

export const useUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getUser,
    retry: false, // ✅ don't retry on 401
    staleTime: 5 * 60 * 1000, // ✅ cache for 5 mins
  });
};
