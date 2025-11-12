"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
    Heading,
    Text,
    Button,
    Logo,
    ToggleButton,
    Input,
    PasswordInput,
    SmartLink,
    SmartImage,
    Line,
    Flex,
    Fade,
    Background,
    Column,
    Row,
    useToast,
} from "@/once-ui/components";
import { Header } from "@/components/Header/Header";
import { useRouter } from "next/navigation";


export default function SignInPage() {

    const { addToast } = useToast();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();


    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Email and / or password is invalid.";
        }
        return null;
    };

    const handleSignIn = async () => {
        const emailError = validateEmail();
        if (emailError) {
            setError(emailError);
            return;
        }

        setError("");
        const result = await login({ email, password });
        if (result.success) {
        
            addToast({
                variant: "success",
                message: "Wohoo! Grab some popcorn. The binge begins now.",
            });
            console.log("Signed In!")
            router.push("/");
        } else {
            addToast({ 
                variant: "danger", 
                message: result?.message || "Unexpected Error. Try again",
            });
        }
    }

    return (
        <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
            <Fade
                zIndex={3}
                pattern={{
                    display: true,
                    size: "4",
                }}
                position="fixed"
                top="0"
                left="0"
                to="bottom"
                height={5}
                fillWidth
                blur={0.25}
            />
            <Header showMenu={false} showOptions={false}/>
            <Column fillWidth paddingX="32" gap="12" horizontal="center" position="relative">
                <Row
                    marginY="32"
                    background="overlay"
                    fillWidth
                    radius="xl"
                    border="neutral-alpha-weak"
                    overflow="hidden"
                >
                    <Row fill hide="m">
                        <SmartImage src="/images/login.jpg" alt="Preview image" sizes="560px" />
                    </Row>
                    <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                        <Background
                            mask={{
                                x: 100,
                                y: 0,
                                radius: 75,
                            }}
                            position="absolute"
                            grid={{
                                display: true,
                                opacity: 50,
                                width: "0.5rem",
                                color: "neutral-alpha-medium",
                                height: "1rem",
                            }}
                        />
                        {/* <Logo icon={false} wordmark={true} size="l" /> */}
                        <Heading as="h3" variant="display-default-xs" align="center">
                            Sign In
                        </Heading>
                        
                        <Column fillWidth gap="8">
                            <Button
                                label="Continue with Google"
                                fillWidth
                                variant="secondary"
                                weight="default"
                                prefixIcon="google"
                                size="l"
                            />
                        </Column>
                        <Row fillWidth paddingY="24">
                            <Row onBackground="neutral-weak" fillWidth gap="24" vertical="center">
                                <Line />/<Line />
                            </Row>
                        </Row>
                        <Column gap="-1" fillWidth>
                            <Input
                                id="email"
                                label="Email"
                                labelAsPlaceholder
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                errorMessage={false}
                                radius="top"
                            />
                            <PasswordInput
                                autoComplete="new-password"
                                id="password"
                                label="Password"
                                labelAsPlaceholder
                                radius="bottom"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Column>
                        <Button
                            id="login"
                            label="Sign In"
                            arrowIcon
                            fillWidth
                            onClick={handleSignIn}
                        />
                        <Text
                            as="span"
                            onBackground="neutral-medium"
                            marginBottom="24"
                            style={{ display: "inline-flex", alignItems: "baseline", gap: "4px" }}
                            >
                            {"New to watchem?"}
                            <Button
                                id="signup"
                                label="Sign up now"
                                variant="link"
                                size="s"
                                href="/signup"
                                fillWidth={false}
                                className="link-button signup-link-button"
                                style={{
                                    // all: "unset",
                                    background: "none",
                                    padding: 0,
                                    color: "var(--once-text-primary, #fff)",
                                    display: "inline", 
                                    fontSize: "inherit", 
                                    fontWeight: "inherit",
                                    cursor: "pointer",
                                }}
                            />
                        </Text>


                        {/* <Button
                            className="mt-32"
                            prefixIcon="security"
                            variant="secondary"
                            onClick={() => setIsFirstDialogOpen(true)}
                        >
                            Password and security
                        </Button> */}
                    </Column>
                </Row>
            </Column>
        </Column>
    )
}

