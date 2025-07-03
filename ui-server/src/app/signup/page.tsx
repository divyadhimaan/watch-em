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


export default function SignupPage() {

    const { addToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);


    const validateLogin = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Email and / or password is invalid.";
        }
        return null;
    };

    return (
        <Column fillWidth paddingY="160" paddingX="s" horizontal="center" flex={1}>
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
                height="xl"
                fillWidth
                blur={0.25}
            >
                <SmartImage src="/images/login.jpg" alt="Preview image" sizes="560px" zIndex={-1}/>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }} />
            </Fade>
            <Header showMenu={false} showOptions={false} showSignIn={true}/>
            <Column fillWidth paddingX="32" gap="12" horizontal="center" position="relative" zIndex={5}>
                <Row
                    marginY="32"
                    radius="xl"
                >
                    <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                        <Heading as="h1" variant="display-strong-l" align="center">
                            Scroll Less. Watch More!
                        </Heading>
                        <Text>
                            Ready to watch? Enter your email and turn the watch mode on!
                        </Text>
                        
                        
                        <Row fillWidth align="center" horizontal="center" gap="s">
                            <Input
                                id="email"
                                label="Email"
                                labelAsPlaceholder
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                validate={validateLogin}
                                errorMessage={false}
                                // radius="top"
                            />
                            <Button
                                id="login"
                                label="Get Started"
                                arrowIcon
                                fillWidth
                                onClick={() => {
                                    addToast({
                                        variant: "success",
                                        message: "Lights, Camera, Watchem!",
                                    });
                                }}
                            />
                        </Row>
                        
                        <Text onBackground="neutral-medium" marginBottom="24" >
                            New to Watchem ? 
                            <SmartLink href="/">sign up</SmartLink>
                        </Text>

                        
                    </Column>
                </Row>
            </Column>
        </Column>
    )
}

