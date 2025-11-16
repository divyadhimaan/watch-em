'use client';

import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useAuth } from "@/hooks/useAuth";
import {
  Column,
  Row,
  Text,
  Heading,
  Avatar,
  Button,
  SegmentedControl,
  Background,
  Feedback,
  SmartImage,
  Icon,
} from "@/once-ui/components";
import { ProfileTab } from "./components/ProfileTab";
import { PlaylistsTab } from "./components/PlaylistsTab";
import { SettingsTab } from "./components/SettingsTab";
import { useProfile } from "@/hooks/useProfile";

export function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(["Action", "Sci-Fi", "Thriller"]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  console.log(profile);

  // Fix hydration: only check auth after component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock stats - replace with actual data from your API
  const stats = {
    playlists: 12,
    moviesWatched: 156,
    ratings: 89,
    reviews: 23,
  };

  // Mock playlists - replace with actual data
  const playlists = [
    { id: 1, name: "Action Favorites", count: 25, image: "/images/movies/movie-1.jpg" },
    { id: 2, name: "Sci-Fi Classics", count: 18, image: "/images/movies/movie-2.jpg" },
    { id: 3, name: "Thriller Night", count: 15, image: "/images/movies/movie-3.jpg" },
    { id: 4, name: "Weekend Binge", count: 32, image: "/images/movies/movie-4.jpg" },
  ];

  // Prevent hydration mismatch: show loading state until mounted
  if (!mounted) {
    return (
      <Column fillWidth flex={1} style={{ minHeight: "100vh" }}>
        <Header />
        <Column fillWidth paddingY="xl" paddingX="l" flex={1} horizontal="center" vertical="center" style={{ minHeight: "60vh" }}>
          <Text size="l" align="center">
            Loading...
          </Text>
        </Column>
        <Footer />
      </Column>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Column fillWidth paddingY="xl" paddingX="l" flex={1} horizontal="center" vertical="center" style={{ minHeight: "60vh" }}>
          <Text size="l" align="center">
            Please sign in to view your profile.
          </Text>
          <Button href="/signin" variant="primary" style={{ marginTop: "16px" }}>
            Sign In
          </Button>
        </Column>
        <Footer />
      </>
    );
  }

  return (
    <Column fillWidth flex={1} style={{ minHeight: "100vh" }}>
      <Header />
      <Column fillWidth paddingY="xl" paddingX="l" flex={1} paddingBottom="80">
        <Row
          horizontal="center"
          paddingX="32"
          paddingY="48"
          fillWidth
          gap="32"
          position="relative"
        >
          <Background
            mask={{
              cursor: true,
            }}
            dots={{
              display: true,
              opacity: 50,
              color: "neutral-solid-strong",
              size: "48",
            }}
            fill
            position="absolute"
            gradient={{
              display: true,
              opacity: 100,
              tilt: 0,
              height: 100,
              width: 200,
              x: 50,
              y: 0,
              colorStart: "neutral-background-medium",
              colorEnd: "static-transparent",
            }}
          />
          
          <Column maxWidth="xl" fillWidth gap="-1">
            {publicProfile && (
              <Feedback 
                icon 
                variant="success" 
                vertical="center" 
                radius={undefined} 
                topRadius="l" 
                zIndex={1}
              >
                Your profile is public.
              </Feedback>
            )}
            
            <Column
              background="page"
              radius={undefined}
              bottomRadius="l"
              overflow="hidden"
              position="relative"
              fillWidth
              border="neutral-medium"
            >
              {/* Cover Image */}
              <SmartImage
                src="/images/profile.jpg"
                alt="Cover"
                aspectRatio="16/9"
                fillWidth
                style={{ objectFit: "cover" }}
              />
              
              {/* Profile Content */}
              <Column
                paddingTop="56"
                paddingX="32"
                paddingBottom="48"
                fillWidth
                position="relative"
                gap="8"
              >
                {/* Avatar and Stats Row */}
                <Row 
                  gap="24" 
                  fillWidth 
                  marginBottom="48"
                >
                  {/* Avatar Section */}
                  <Column 
                    horizontal="center" 
                    gap="8"
                    fillWidth
                  >
                    <Avatar
                      zIndex={1}
                      style={{
                        border: "8px solid var(--page-background)",
                      }}
                      size="xl"
                      src="/images/profile.jpg"
                    />
                    <Heading as="h3" variant="display-default-m">
                      {user?.username || "User"}
                    </Heading>
                    {/* <Text align="center" onBackground="neutral-weak">
                      {stats.moviesWatched} movies watched • {stats.ratings} ratings
                    </Text> */}
                    
                    {profile?.country && 
                      <Row gap="8" vertical="center">
                        <Icon size="xs" name="globe" />
                        {profile?.country}
                      </Row>
                    }
                  </Column>
                </Row>

                {/* Tabs */}
                <SegmentedControl
                  onToggle={(value) => setActiveTab(value)}
                  buttons={[
                    {
                      size: "l",
                      value: "profile",
                      label: "Profile",
                    },
                    {
                      size: "l",
                      value: "playlists",
                      label: "Playlists",
                    },
                    {
                      size: "l",
                      value: "settings",
                      label: "Settings",
                    },
                  ]}
                  marginBottom="24"
                />

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <ProfileTab
                    user={user}
                    profile={profile}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    bio={bio}
                    setBio={setBio}
                    country={country}
                    setCountry={setCountry}
                    favoriteGenres={favoriteGenres}
                    setFavoriteGenres={setFavoriteGenres}
                    stats={stats}
                  />
                )}

                {/* Playlists Tab */}
                {activeTab === "playlists" && (
                  <PlaylistsTab playlists={playlists} />
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <SettingsTab
                    publicProfile={publicProfile}
                    setPublicProfile={setPublicProfile}
                    emailNotifications={emailNotifications}
                    setEmailNotifications={setEmailNotifications}
                  />
                )}
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
      <Footer />
    </Column>
  );
}