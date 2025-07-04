"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';



import { Fade, Flex, Logo, Row, Line, StyleOverlay, ToggleButton, Input } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes } from "@/once-ui/resources/config";
import { movies, series } from "@/once-ui/resources/content"



interface HeaderProps {
    showLogo?: boolean;
    showMenu?: boolean;
    showOptions?: boolean;
    showSignIn?: boolean;
  }

export const Header: React.FC<HeaderProps> = ({
    showLogo = true,
    showMenu = true,
    showOptions = true,
    showSignIn = false,
  }) => {
    const pathname = usePathname() ?? "";
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (searchExpanded) {
            searchRef.current?.focus();
        }
    }, [searchExpanded]);


    const checkNodeServer = () => {
        console.log("Checking Node Server...");
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/hello`)
        
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    };

    return (
        <>
            <Row position="fixed" top="0" fillWidth horizontal="center" zIndex={3}>
                <Row
                    data-border="rounded"
                    horizontal="space-between"
                    maxWidth="xl"
                    paddingRight="64"
                    paddingLeft="32"
                    paddingY="20"
                >
                    <Row hide="s">
                    {showLogo && <Logo size="m" icon={false} href="/" />}
                    </Row>
                    
                    
                    {showMenu && <Flex
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
                            {routes["/series"] && (
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
                            )}
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
                    }

                    {showOptions && 
                        <Row gap="12" hide="s">
                            <Flex
                                background="surface"
                                border="neutral-medium"
                                radius="m-4"
                                shadow="l"
                                padding="4"
                                horizontal="center"
                            >
                                <ToggleButton prefixIcon="notification" onClick={checkNodeServer} selected={false} />
                            
                            </Flex><Flex
                                background="surface"
                                border="neutral-medium"
                                radius="m-4"
                                shadow="l"
                                padding="4"
                                horizontal="center"
                            >
                                <ToggleButton prefixIcon="person"  href="/signin" selected={false} />
                            </Flex>
                            <Row position="fixed" top="20" right="20">
                                <StyleOverlay position="fixed" top="8" right="8" style={{ height: "calc(100vh - var(--static-space-16))" }} />
                            </Row>
                        </Row>
                    }
                    {showSignIn && 
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
                    }
                </Row>
            </Row>
        </>
    );
};
