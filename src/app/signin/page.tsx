"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import {
  Heading,
  Text,
  Button,
  Input,
  PasswordInput,
  SmartImage,
  Line,
  Fade,
  Background,
  Column,
  Row,
  useToast,
} from "@once-ui/components";

import { Header } from "@/components/Header/Header";

export default function SignInPage() {
  const { addToast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (): string | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Email and / or password is invalid.";
    }
    return null;
  };

  const handleSignIn = async () => {
    const emailError = validateEmail();
    if (emailError) {
      addToast({ variant: "danger", message: emailError });
      return;
    }

    if (!password) {
      addToast({ variant: "danger", message: "Password is required." });
      return;
    }

    try {
      await login({ email, password });

      addToast({
        variant: "success",
        message: "Welcome back. Let the binge continue.",
      });

      router.replace("/");
    } catch (error: unknown) {
      addToast({
        variant: "danger",
        message:
          error instanceof Error
            ? error.message
            : "Login failed. Try again.",
      });
    }
  };

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <Fade
        zIndex={3}
        pattern={{ display: true, size: "4" }}
        position="fixed"
        top="0"
        left="0"
        to="bottom"
        height={5}
        fillWidth
        blur={0.25}
      />

      <Header showMenu={false} showOptions={false} />

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
              mask={{ x: 100, y: 0, radius: 75 }}
              position="absolute"
              grid={{
                display: true,
                opacity: 50,
                width: "0.5rem",
                color: "neutral-alpha-medium",
                height: "1rem",
              }}
            />

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
                onClick={() => signIn("google", { callbackUrl: "/" })}
              />
            </Column>

            <Row fillWidth paddingY="24">
              <Row onBackground="neutral-weak" fillWidth gap="24" vertical="center">
                <Line />/<Line />
              </Row>
            </Row>

            <Column fillWidth gap="0">
              <Input
                id="email"
                label="Email"
                labelAsPlaceholder
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                radius="top"
              />

              <PasswordInput
                autoComplete="current-password"
                id="password"
                label="Password"
                labelAsPlaceholder
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                radius="bottom"
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
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "4px",
              }}
            >
              {"New to watchem?"}
              <Button
                id="signup"
                label="Sign up now"
                variant="link"
                size="s"
                href="/signup"
                fillWidth={false}
              />
            </Text>
          </Column>
        </Row>
      </Column>
    </Column>
  );
}
