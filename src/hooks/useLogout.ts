import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout } from "../api/autApi";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // Remove cached current user
      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });

      navigate("/login");
    },
  });
};
