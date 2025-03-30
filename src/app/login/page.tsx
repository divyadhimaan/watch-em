"use client";

import React, { useState } from "react";

import {
    Heading,
    Text,
    Button,
    Logo,
    Input,
    PasswordInput,
    SmartLink,
    SmartImage,
    Line,
    Fade,
    Background,
    Column,
    Row,
    useToast,
} from "@/once-ui/components";
import { Header } from "@/components/header";




const page = () => {

    const { addToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateLogin = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Email and / or password is invalid.";
        }
        return null;
    };

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
            <Header />
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
                        <SmartImage src="/images/login.png" alt="Preview image" sizes="560px" />
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
                        <Logo wordmark={false} size="l" />
                        <Heading as="h3" variant="display-default-s" align="center">
                            Welcome to Watch'em
                        </Heading>
                        <Text onBackground="neutral-medium" marginBottom="24">
                            Log in or
                            <SmartLink href="/">sign up</SmartLink>
                        </Text>
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
                                validate={validateLogin}
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
                                validate={validateLogin}
                            />
                        </Column>
                        <Button
                            id="login"
                            label="Log in"
                            arrowIcon
                            fillWidth
                            onClick={() => {
                                addToast({
                                    variant: "success",
                                    message: "Wohoo! You are logged in` a!",
                                });
                            }}
                        />
                    </Column>
                </Row>
            </Column>
        </Column>
    )
}

export default page