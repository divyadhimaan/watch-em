import { Profile } from '@/types/User';
import { useEffect, useState } from 'react';

export const useProfile = () => {
    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchProfile = async () => {
        if(!token){
            setError("No authentication token found");
            setLoading(false);
            return;
        }

        try{
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/profile`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                }
            );
            if (!res.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data: Profile = await res.json();
            setProfile(data);

            const profileObj: Profile = {
                userId: data.userId,
                avatarUrl: data.avatarUrl,
                country: data.country,
                bio: data.bio,
                favourites: data.favourites,
                playlists: data.playlists
              }
            localStorage.setItem("user", JSON.stringify(profileObj));

            setError(null);
        }catch (err: any) {
            setError(err.message || "Failed to load profile");
            setProfile(null);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        fetchProfile();
      }, [token]);


      return { profile, loading, error, refetch: fetchProfile };
};