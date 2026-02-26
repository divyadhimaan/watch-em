"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, type FC } from "react";
import {
  Flex,
  Logo,
  Row,
  Line,
  StyleOverlay,
  ToggleButton,
} from "@once-ui/components";
import { useAuth } from "@/context/AuthContext";
import { SearchInput } from "./../SearchInput";
import { UserMenu } from "./components/UserMenu";

import { routes } from "@once-ui/resources/config";
import { movies } from "@once-ui/resources/content";
import styles from "./Header.module.scss";

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
  const [searchText, setSearchText] = useState("");

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Fix hydration: only use auth state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

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
            className={styles.navBar}
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

              <Line vert maxHeight="24" />
              <SearchInput value={searchText} onChange={setSearchText} />
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
            {showOptions && (
              <Row gap="12" hide="s">
                {mounted &&
                  (isAuthenticated ? (
                    <UserMenu username={profile?.username ?? ""} onLogout={logout} />
                  ) : (
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
                        href="/signin"
                        label="Sign In"
                        selected={false}
                      />
                    </Flex>
                  ))}
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
