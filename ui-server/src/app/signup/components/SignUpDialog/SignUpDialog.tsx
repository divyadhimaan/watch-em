import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    Heading,
    Button,
    Input,
    PasswordInput,
    Line,
    Background,
    Column,
    Row,
    useToast,
} from "@/once-ui/components";

type SignUpDialogProps = {
    onClose: () => void;
    credentials: {email: string; password: string} | null;
    setCredentials: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
}

const SignUpDialog = ({ 
    onClose, 
    credentials, 
    setCredentials 
} : SignUpDialogProps ) => {
    const { addToast } = useToast();
    const router = useRouter();

    const [email, setEmail] = useState(credentials?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (error) {
          addToast({
            variant: "danger",
            message: error,
          });
        }
        setError("");
      }, [error, addToast]);

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Email is invalid.";
        }
        return null;
    };

    const handleSignUp = () => {
        const emailError = validateEmail();
        if (emailError) {
          setError(emailError);
          return;
        }
    
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
    
        setError("");

        setCredentials({ email, password });

        addToast({
            variant: "success",
            message: "Wohoo! Grab some popcorn. The binge begins now.",
        });

        onClose();
        router.push("/");
      };

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

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
        </div>

        <Column fillWidth paddingX="32" gap="12" horizontal="center" position="relative">
            <Row
                fillWidth
                radius="xl"
                overflow="hidden"
            >
                
                <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                    
                    {/* <Logo icon={false} wordmark={true} size="l" /> */}
                    <Heading as="h3" variant="display-default-xs" align="center">
                        Sign Up
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
                    <Column gap="12" fillWidth>
                        <Input
                            id="email"
                            label="Email"
                            labelAsPlaceholder
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            validate={validateEmail}
                            errorMessage={false}
                            // radius="top"
                        />
                        <PasswordInput
                            autoComplete="new-password"
                            id="password"
                            label="Password"
                            labelAsPlaceholder
                            // radius="bottom"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        {password && <PasswordInput
                            autoComplete="new-password"
                            id="confirm-password"
                            label="Re-type Password"
                            labelAsPlaceholder
                            // radius="bottom"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />}
                    </Column>

                
                    <Button
                        id="login"
                        label="Sign In"
                        arrowIcon
                        fillWidth
                        onClick={handleSignUp}
                        // onClick={() => {
                        //     addToast({
                        //         variant: "success",
                        //         message: "Wohoo! Grab some popcorn. The binge begins now.",
                        //     });
                        // }}
                    />
    


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

export default SignUpDialog