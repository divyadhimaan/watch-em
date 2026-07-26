import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import {
  Heading,
  Button,
  Input,
  PasswordInput,
  Line,
  Background,
  Column,
  Row,
  Text,
  useToast,
} from "@once-ui/components";
import { GoogleSignInButton } from "@/components/GoogleSignInButton/GoogleSignInButton";

type SignUpDialogProps = {
  onClose: () => void;
  credentials: { email: string; password: string; username: string } | null;
  setCredentials: React.Dispatch<
    React.SetStateAction<{ email: string; password: string; username: string }>
  >;
};

const AVATARS = [
  { id: "male", label: "Male", src: "/avatars/avatar-male.jpg" },
  { id: "female", label: "Female", src: "/avatars/avatar-female.jpg" },
];

const SignUpDialog = ({ onClose, credentials, setCredentials }: SignUpDialogProps) => {
  const { addToast } = useToast();
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState(credentials?.email || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("male");

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Email is invalid.";
    return null;
  };

  const handleGoogleCredential = async (idToken: string) => {
    const success = await loginWithGoogle(idToken);
    if (success) {
      addToast({ variant: "success", message: "Wohoo! Grab some popcorn. The binge begins now." });
      onClose();
      router.replace("/");
    } else {
      addToast({ variant: "danger", message: "Google sign-in failed. Try again." });
    }
  };

  const handleSignUp = async () => {
    const emailError = validateEmail();
    if (emailError) {
      addToast({ variant: "danger", message: emailError });
      return;
    }

    if (password !== confirmPassword) {
      addToast({ variant: "danger", message: "Passwords do not match." });
      return;
    }

    const avatarSrc = AVATARS.find((a) => a.id === selectedAvatar)?.src ?? AVATARS[0].src;

    try {
      await signup({ email, password, username }, avatarSrc);
      addToast({ variant: "success", message: "Wohoo! Grab some popcorn. The binge begins now." });
      onClose();
      router.replace("/");
    } catch (error: unknown) {
      addToast({
        variant: "danger",
        message: error instanceof Error ? error.message : "Unexpected error. Try again.",
      });
    }
  };

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
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
      </div>

      <Column fillWidth paddingX="32" gap="12" horizontal="center" position="relative">
        <Row fillWidth radius="xl" overflow="hidden">
          <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
            <Heading as="h3" variant="display-default-xs" align="center">
              Sign Up
            </Heading>

            <Column fillWidth gap="8">
              <GoogleSignInButton onCredential={handleGoogleCredential} />
            </Column>

            <Row fillWidth paddingY="24">
              <Row onBackground="neutral-weak" fillWidth gap="24" vertical="center">
                <Line />/<Line />
              </Row>
            </Row>

            {/* Avatar selection */}
            <Column fillWidth gap="12">
              <Text size="s" weight="strong" onBackground="neutral-medium" align="center">
                Choose your avatar
              </Text>
              <Row gap="16" horizontal="center" fillWidth>
                {AVATARS.map((avatar) => {
                  const isSelected = selectedAvatar === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        outline: "none",
                      }}
                    >
                      <div
                        style={{
                          width: "88px",
                          height: "88px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: isSelected
                            ? "3px solid var(--brand-solid-strong)"
                            : "3px solid transparent",
                          boxShadow: isSelected
                            ? "0 0 0 2px var(--brand-solid-strong)"
                            : "0 0 0 2px var(--neutral-alpha-medium)",
                          transition: "border-color 0.15s, box-shadow 0.15s",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={avatar.src}
                          alt={avatar.label}
                          style={{ width: "100%", height: "100%", display: "block" }}
                        />
                      </div>
                      <Text
                        size="s"
                        weight={isSelected ? "strong" : "default"}
                        onBackground={isSelected ? "brand-strong" : "neutral-weak"}
                      >
                        {avatar.label}
                      </Text>
                    </button>
                  );
                })}
              </Row>
            </Column>

            <Line />

            <Column gap="12" fillWidth>
              <Input
                id="email"
                label="Email"
                labelAsPlaceholder
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                validate={validateEmail}
                errorMessage={false}
              />
              <Input
                id="username"
                label="Username"
                labelAsPlaceholder
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                errorMessage={false}
              />
              <PasswordInput
                autoComplete="new-password"
                id="password"
                label="Password"
                labelAsPlaceholder
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {password && (
                <PasswordInput
                  autoComplete="new-password"
                  id="confirm-password"
                  label="Re-type Password"
                  labelAsPlaceholder
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              )}
            </Column>

            <Button id="signup-submit" label="Create Account" arrowIcon fillWidth onClick={handleSignUp} />
          </Column>
        </Row>
      </Column>
    </Column>
  );
};

export default SignUpDialog;
