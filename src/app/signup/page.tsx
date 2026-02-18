"use client";

import React, { useState } from "react";

import {
    Heading,
    Text,
    Button,
    Input,
    SmartImage,
    Fade,
    Column,
    Row,
    useToast,
    Dialog,
} from "../../../packages/once-ui/components";
import { Header } from "@/components/Header/Header";
import SignUpDialog from "./components/SignUpDialog/SignUpDialog"


export default function SignupPage() {

    const { addToast } = useToast();

    const [openDialog, setOpenDialog] = useState(false);
    const [credentials, setCredentials] = useState<{ email: string; password: string; username: string }>({
        email: "",
        password: "",
        username: "",
      });


    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(credentials.email)) {
            return "Email is invalid.";
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
                                onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                                value={credentials?.email || ""}
                                validate={validateEmail}
                                errorMessage={false}
                            />
                            <Button
                                id="login"
                                label="Get Started"
                                arrowIcon
                                fillWidth
                                onClick={() => {
                                    if(credentials.email===""){
                                        addToast({
                                            variant: "danger",
                                            message: "Email cannot be empty.",
                                        });
                                        return;
                                    }
                                    const error = validateEmail();
                                    if (error) {
                                      addToast({
                                        variant: "danger",
                                        message: error,
                                      });
                                      return;
                                    }
                                    
                                
                                    setOpenDialog(true);
                                  }}
                            />
                        </Row>
                        {openDialog && (
                            <Dialog 
                                title=""
                                isOpen={openDialog}
                                onClose={() => setOpenDialog(false)}
                                closeOnOutsideClick={false}
                            >
                                <SignUpDialog 
                                    onClose={() => setOpenDialog(false)} 
                                    credentials={credentials}
                                    setCredentials={setCredentials}
                                />
                            </ Dialog>
                        )}
                        
                        <Text
                            as="span"
                            onBackground="neutral-medium"
                            marginBottom="24"
                            style={{ display: "inline-flex", alignItems: "baseline", gap: "4px" }}
                            >
                            {"Already a member?"}
                            <Button
                                id="signin"
                                label="Sign in"
                                variant="link"
                                size="s"
                                href="/signin"
                                fillWidth={false}
                                className="link-button signin-link-button"
                                style={{
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

                        
                    </Column>
                </Row>
            </Column>
        </Column>
    )
}

