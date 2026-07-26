'use client';

import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  Card,
  Input,
  Textarea,
  Line,
  Icon,
} from "@once-ui/components";
import type { UserProfile } from "@app-types/User";

interface ProfileTabProps {
  profile: UserProfile | null,
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  country: string,
  setCountry: (country: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function ProfileTab({
  profile,
  isEditing,
  setIsEditing,
  username,
  setUsername,
  bio,
  setBio,
  country,
  setCountry,
  onSave,
  isSaving,
}: ProfileTabProps) {
  const displayBio = bio || profile?.bio;

  return (
    <Column fillWidth gap="16">
      {!isEditing ? (
        <Card padding="24" radius="l" fillWidth>
          <Column gap="20" fillWidth>
            <Row horizontal="space-between" vertical="center" fillWidth>
              <Heading as="h4" variant="heading-default-l">About</Heading>
              <Button
                variant="secondary"
                size="s"
                prefixIcon="person"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </Row>

            <Line />

            {/* Bio */}
            {displayBio ? (
              <Text onBackground="neutral-weak" style={{ lineHeight: "1.7" }}>
                {displayBio}
              </Text>
            ) : (
              <Text onBackground="neutral-weak" style={{ fontStyle: "italic" }}>
                No bio yet — tell the world what you're watching.
              </Text>
            )}

            {/* Details grid */}
            <Column gap="12">
              <Row gap="8" vertical="center">
                <Icon name="person" size="s" onBackground="neutral-medium" />
                <Text size="s" weight="strong" onBackground="neutral-medium" style={{ minWidth: "80px" }}>
                  Username
                </Text>
                <Text onBackground="neutral-weak">{profile?.username || "Not set"}</Text>
              </Row>

              {(profile?.country || country) && (
                <Row gap="8" vertical="center">
                  <Icon name="globe" size="s" onBackground="neutral-medium" />
                  <Text size="s" weight="strong" onBackground="neutral-medium" style={{ minWidth: "80px" }}>
                    Country
                  </Text>
                  <Text onBackground="neutral-weak">{profile?.country || country}</Text>
                </Row>
              )}
            </Column>

          </Column>
        </Card>
      ) : (
        <Card padding="24" radius="l" fillWidth>
          <Column gap="20" fillWidth>
            <Row horizontal="space-between" vertical="center" fillWidth>
              <Heading as="h4" variant="heading-default-l">Edit Profile</Heading>
              <Button variant="secondary" size="s" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Row>

            <Line />

            <Column gap="16">
              <Column gap="8">
                <Text size="s" weight="strong" onBackground="neutral-medium">Username</Text>
                <Input
                  id="username"
                  label=""
                  labelAsPlaceholder
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  hasPrefix={<Icon name="person" size="xs" />}
                />
              </Column>

              <Column gap="8">
                <Text size="s" weight="strong" onBackground="neutral-medium">Country</Text>
                <Input
                  id="country"
                  label=""
                  labelAsPlaceholder
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Where are you from?"
                  hasPrefix={<Icon name="globe" size="xs" />}
                />
              </Column>

              <Column gap="8">
                <Text size="s" weight="strong" onBackground="neutral-medium">Bio</Text>
                <Textarea
                  id="bio"
                  label=""
                  lines={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself, your favorite movies, and what you're watching..."
                />
              </Column>
            </Column>

            <Line />

            <Row gap="12" horizontal="end">
              <Button variant="secondary" onClick={() => setIsEditing(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onSave} loading={isSaving}>
                Save Changes
              </Button>
            </Row>
          </Column>
        </Card>
      )}
    </Column>
  );
}
