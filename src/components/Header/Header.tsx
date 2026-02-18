"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, type FC } from "react";
import { Dropdown, Flex, Logo, Row, Line, StyleOverlay, ToggleButton } from "@once-ui/components";
import { useAuth } from "@/context/AuthContext";

import { routes } from "@once-ui/resources/config";
import { movies } from "@once-ui/resources/content";

interface HeaderProps {
  showLogo?: boolean;
  showMenu?: boolean;
  showOptions?: boolean;
  showSignIn?: boolean;
}

export const Header: FC<HeaderProps> = ({
  showLogo = true,
  showMenu = true,
  showOptions = true,
  showSignIn = false,
}) => {
  const { profile, isAuthenticated, logout } = useAuth();

  const pathname = usePathname() ?? "";
  const [mounted, setMounted] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  // const [searchText, setSearchText] = useState("");
  // const searchRef = useRef<HTMLInputElement | null>(null);

  // Fix hydration: only use auth state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //     if (searchExpanded) {
  //         searchRef.current?.focus();
  //     }
  // }, [searchExpanded]);

  return (
    <Row position="fixed" top="0" fillWidth horizontal="center" zIndex={3}>
      <Row
        data-border="rounded"
        horizontal="space-between"
        maxWidth="xl"
        paddingRight="64"
        paddingLeft="32"
        paddingY="20"
      >
        <Row hide="s">{showLogo && <Logo size="m" icon={false} href="/" />}</Row>

        {showMenu && (
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line vert maxHeight="24" />
              {routes["/movies"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="movies"
                    href="/movies"
                    label={movies.label}
                    selected={pathname === "/movies"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="movies"
                    href="/movies"
                    selected={pathname === "/movies"}
                  />
                </>
              )}
              {/* {routes["/series"] && (
                                <>
                                    <ToggleButton
                                        className="s-flex-hide"
                                        prefixIcon="series"
                                        href="/series"
                                        label={series.label}
                                        selected={pathname.startsWith("/series")}
                                    />
                                    <ToggleButton
                                        className="s-flex-show"
                                        prefixIcon="series"
                                        href="/series"
                                        selected={pathname.startsWith("/series")}
                                    />
                                </>
                            )} */}

              {/* <Line vert maxHeight="24" /> */}
              {/* <Flex align="center" style={{ position: "relative", minWidth: "40px" }}>
                                {!searchExpanded ? (
                                    <ToggleButton
                                        prefixIcon="search"
                                        onClick={() => {
                                            setSearchExpanded(true);
                                            setTimeout(() => searchRef.current?.focus(), 50);
                                        }}
                                        selected={false}
                                    />
                                ) : (
                                    <Flex
                                        style={{
                                            height: "100%",
                                            maxHeight: "100px",
                                            transition: "width 0.3s ease-in-out",
                                        }}
                                    >
                                        <Input
                                            id="search-bar"
                                            label=""
                                            autoFocus
                                            placeholder="Type to search..."
                                            value={searchText}
                                            ref={searchRef}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            onBlur={() => setTimeout(() => setSearchExpanded(false), 150)}
                                            style={{
                                                width: "100%",
                                                minWidth: "150px",
                                            }}
                                        />
                                    </Flex>
                                )}
                            </Flex> */}
            </Flex>
          </Flex>
        )}

        {showOptions && (
          <Row gap="12" hide="s">
            {/* <Flex
                                background="surface"
                                border="neutral-medium"
                                radius="m-4"
                                shadow="l"
                                padding="4"
                                horizontal="center"
                            >
                                <ToggleButton prefixIcon="notification" onClick={checkNodeServer} selected={false} />
                            </Flex> */}
            <Flex
              background="surface"
              border="neutral-medium"
              radius="m-4"
              shadow="l"
              padding="4"
              horizontal="center"
            >
              <ToggleButton
                prefixIcon="person"
                suffixIcon={mounted && isAuthenticated ? "chevronDown" : ""}
                href={mounted && isAuthenticated ? "" : "/signin"}
                label={mounted && isAuthenticated ? `Hello, ${profile?.username}` : "Sign In"}
                selected={false}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              />
              {showUserDropdown && mounted && isAuthenticated && (
                <Dropdown
                  style={{
                    position: "absolute",
                    top: "80%",
                    width: "160px",
                    zIndex: 1000,
                  }}
                  onSelect={(option) => {
                    setShowUserDropdown(false);
                    if (option === "profile") window.location.href = "/profile";
                    if (option === "logout") logout();
                  }}
                >
                  <div data-value="profile" style={{ padding: "8px 12px", cursor: "pointer" }}>
                    My Profile
                  </div>
                  <div data-value="logout" style={{ padding: "8px 12px", cursor: "pointer" }}>
                    Logout
                  </div>
                </Dropdown>
              )}
            </Flex>
            <Row position="fixed" top="20" right="20">
              <StyleOverlay
                position="fixed"
                top="8"
                right="8"
                style={{ height: "calc(100vh - var(--static-space-16))" }}
              />
            </Row>
          </Row>
        )}
        {showSignIn && (
          <Row gap="12" hide="s">
            <Flex
              background="surface"
              border="neutral-medium"
              radius="m-4"
              shadow="l"
              padding="4"
              horizontal="center"
            >
              <ToggleButton label="Sign In" href="/signin" selected={false} />
            </Flex>
          </Row>
        )}
      </Row>
    </Row>
  );
};
