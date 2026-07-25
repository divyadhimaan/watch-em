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
  Button,
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
  const { profile, isAuthenticated, logout, isReady } = useAuth();

  const pathname = usePathname() ?? "";
  const [searchText, setSearchText] = useState("");

  return (
    <>
      {/* Mobile-only top logo bar */}
      {showLogo && (
        <Row
          className={styles.mobileLogoBar}
          position="fixed"
          top="0"
          fillWidth
          horizontal="center"
          zIndex={3}
          paddingX="20"
          paddingY="16"
        >
          <Logo size="m" icon={false} href="/" />
        </Row>
      )}

    <Row className={styles.headerWrap} position="fixed" top="0" fillWidth horizontal="center" zIndex={3}>
      <Row
        className={styles.headerBar}
        data-border="rounded"
        horizontal="space-between"
        maxWidth="xl"
        paddingRight="64"
        paddingLeft="32"
        paddingY="20"
      >
        {/* LOGO */}
        <Row hide="s">{showLogo && <Logo size="m" icon={false} href="/" />}</Row>

        {/* Navigation */}
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

              {routes["/vibe"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="sparkle"
                    href="/vibe"
                    label="Vibe"
                    selected={pathname.startsWith("/vibe")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="sparkle"
                    href="/vibe"
                    selected={pathname.startsWith("/vibe")}
                  />
                </>
              )}

              {routes["/watchroom"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="family"
                    href="/watchroom"
                    label="Watch Room"
                    selected={pathname.startsWith("/watchroom")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="family"
                    href="/watchroom"
                    selected={pathname.startsWith("/watchroom")}
                  />
                </>
              )}

              <Line vert maxHeight="24" />
              <SearchInput value={searchText} onChange={setSearchText} />

              {/* Mobile-only auth button inside the nav pill */}
              {isReady && (
                <>
                  <Line vert maxHeight="24" className="s-flex-show" />
                  {isAuthenticated ? (
                    <Flex className="s-flex-show" gap="4" vertical="center">
                      <ToggleButton
                        prefixIcon="person"
                        href="/profile"
                        selected={pathname === "/profile"}
                      />
                    </Flex>
                  ) : (
                    <ToggleButton
                      className="s-flex-show"
                      prefixIcon="person"
                      href="/signin"
                      selected={pathname === "/signin"}
                    />
                  )}
                </>
              )}
            </Flex>
          </Flex>
        )}

        {/* Right Section */}
        {showOptions && (
          <Row gap="12" hide="s">
            {/* Auth Section */}
            {isReady && (
              isAuthenticated ? (
                <UserMenu
                  username={profile?.username ?? ""}
                  onLogout={logout}
                />
              ) : (
                <Button
                  variant="primary"
                  size="s"
                  prefixIcon="person"
                  label="Sign In"
                  href="/signin"
                />
              )
            )}

            {/* Overlay */}
            {/* <Row position="fixed" top="20" right="20">
              <StyleOverlay
                position="fixed"
                top="8"
                right="8"
                style={{
                  height: "calc(100vh - var(--static-space-16))",
                }}
              />
            </Row> */}
          </Row>
        )}


        {/* Explicit SignIn Variant */}
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
              <ToggleButton
                label="Sign In"
                href="/signin"
                selected={false}
              />
            </Flex>
          </Row>
        )}
      </Row>
    </Row>
    </>
  );
};
