import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@store/profileApi";
import { useAuth } from "@/context/AuthContext";

/* -------- Get Profile -------- */

export const useProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => {
        if (!token) throw new Error("No auth token");
        return profileApi.getMe(token);
      },
    enabled: !!token,
  });
};

/* -------- Update Profile -------- */

export const useUpdateProfile = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: any) =>{
        if (!token) throw new Error("Not authenticated");
        return profileApi.updateMe(token, body);
      },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

/* -------- Add Favourite -------- */

export const useAddFavourite = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: any) => {
        if (!token) throw new Error("Not authenticated");
        return profileApi.updateMe(token, body);
      },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

/* -------- Remove Favourite -------- */

export const useRemoveFavourite = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: any) => {
        if (!token) throw new Error("Not authenticated");
        return profileApi.updateMe(token, body);
      },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
