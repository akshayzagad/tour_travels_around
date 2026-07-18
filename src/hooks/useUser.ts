import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/userApi";

export const useUser = () => {
    return useQuery({
        queryKey:["currentUser"],
        queryFn: getUser,
    })
}