'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useAuth } from "@/context/AuthContext";
import {
  Column,
  Row,
  Text,
  Heading,
  Avatar,
  Button,
  SegmentedControl,
  Feedback,
  SmartImage,
  Icon,
} from "@once-ui/components";
import { ProfileTab } from "./components/ProfileTab";
import { PlaylistsTab } from "./components/PlaylistsTab";
import { FavouritesTab } from "./components/FavouritesTab";
import { WatchlistTab } from "./components/WatchlistTab";
import { SettingsTab } from "./components/SettingsTab";

export function ProfilePage() {
  const { profile, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  useEffect(() => {
    setMounted(true);
    const tab = searchParams?.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const cinemaBackground = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <img
        src="/images/login.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.78)",
        }}
      />
    </div>
  );

  if (!mounted) {
    return (
      <Column fillWidth flex={1} style={{ minHeight: "100vh" }}>
        <Header />
        <Column fillWidth flex={1} horizontal="center" vertical="center" style={{ minHeight: "60vh" }}>
          <Text size="l" align="center">Loading...</Text>
        </Column>
        <Footer />
      </Column>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {cinemaBackground}
        <Column fillWidth flex={1} style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
          <Header />
          <Column fillWidth flex={1} horizontal="center" vertical="center" gap="16" style={{ minHeight: "60vh" }}>
            <Text size="l" align="center">Please sign in to view your profile.</Text>
            <Button href="/signin" variant="primary">Sign In</Button>
          </Column>
          <Footer />
        </Column>
      </>
    );
  }

  return (
    <>
      {cinemaBackground}

      <Column fillWidth flex={1} style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Header />

        <Column fillWidth paddingY="xl" paddingX="l" flex={1} paddingBottom="80">
          <Row horizontal="center" paddingX="16" paddingY="32" fillWidth>
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
                {/* Cover image with gradient fade and overlapping avatar */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "21/6", overflow: "hidden" }}>
                  <SmartImage
                    src="/images/login.jpg"
                    alt="Cover"
                    fill
                    style={{ objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, transparent 40%, var(--page-background) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-48px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 2,
                    }}
                  >
                    <Avatar
                      size="xl"
                      src="/images/profile.jpg"
                      style={{ border: "4px solid var(--page-background)", display: "block" }}
                    />
                  </div>
                </div>

                {/* Profile info */}
                <Column
                  paddingTop="64"
                  paddingX="16"
                  paddingBottom="48"
                  fillWidth
                  gap="16"
                  horizontal="center"
                >
                  {/* Name + location */}
                  <Column horizontal="center" gap="4" fillWidth>
                    <Heading as="h3" variant="display-default-m">
                      {profile?.username || "User"}
                    </Heading>
                    {profile?.country && (
                      <Row gap="8" vertical="center">
                        <Icon size="xs" name="globe" onBackground="neutral-weak" />
                        <Text size="s" onBackground="neutral-weak">
                          {profile.country}
                        </Text>
                      </Row>
                    )}
                  </Column>

                  {/* Tabs */}
                  <div
                    style={{
                      width: "100%",
                      overflowX: "auto",
                      WebkitOverflowScrolling: "touch",
                      scrollbarWidth: "none",
                    }}
                  >
                    <SegmentedControl
                      onToggle={(value) => setActiveTab(value)}
                      selected={activeTab}
                      buttons={[
                        { size: "l", value: "profile", label: "Profile" },
                        { size: "l", value: "favourites", label: "Favourites" },
                        { size: "l", value: "watchlist", label: "Watchlist" },
                        { size: "l", value: "playlists", label: "Playlists" },
                        // { size: "l", value: "settings", label: "Settings" },
                      ]}
                      marginBottom="24"
                    />
                  </div>

                  {/* Tab content */}
                  {activeTab === "profile" && (
                    <ProfileTab
                      profile={profile}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      bio={bio}
                      setBio={setBio}
                      country={country}
                      setCountry={setCountry}
                    />
                  )}
                  {activeTab === "favourites" && <FavouritesTab />}
                  {activeTab === "watchlist" && <WatchlistTab />}
                  {activeTab === "playlists" && <PlaylistsTab />}
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
    </>
  );
}
