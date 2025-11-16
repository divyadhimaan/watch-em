'use client';

import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  Card,
  Badge,
  Input,
  Textarea,
  Line,
  Grid,
  Icon,
  TagInput,
} from "@/once-ui/components";

interface ProfileTabProps {
  user: {
    username?: string;
    email?: string;
  } | null;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  bio: string;
  setBio: (bio: string) => void;
  favoriteGenres: string[];
  setFavoriteGenres: (genres: string[]) => void;
  stats: {
    playlists: number;
    moviesWatched: number;
    ratings: number;
    reviews: number;
  };
}

export function ProfileTab({
  user,
  isEditing,
  setIsEditing,
  bio,
  setBio,
  favoriteGenres,
  setFavoriteGenres,
  stats,
}: ProfileTabProps) {
  return (
    <Column fillWidth gap="24">
      {!isEditing ? (
        <>
          {/* About Section */}
          <Card padding="24" radius="l" fillWidth>
            <Column gap="16">
              <Row horizontal="space-between" vertical="center">
                <Heading as="h4" variant="heading-default-l">
                  About
                </Heading>
                <Button
                  variant="secondary"
                  size="s"
                  prefixIcon="person"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </Row>
              
              {bio && (
                <>
                  <Text onBackground="neutral-weak" style={{ lineHeight: "1.6" }}>
                    {bio}
                  </Text>
                  <Line />
                </>
              )}
              
              <Grid columns={2} gap="16">
                <Column gap="8">
                  <Row gap="8" vertical="center">
                    <Icon name="person" size="s" onBackground="neutral-medium" />
                    <Text size="s" weight="strong" onBackground="neutral-medium">
                      Username
                    </Text>
                  </Row>
                  <Text onBackground="neutral-weak">{user?.username || "Not set"}</Text>
                </Column>
                
                <Column gap="8">
                  <Row gap="8" vertical="center">
                    <Icon name="openLink" size="s" onBackground="neutral-medium" />
                    <Text size="s" weight="strong" onBackground="neutral-medium">
                      Email
                    </Text>
                  </Row>
                  <Text onBackground="neutral-weak">{user?.email || "Not set"}</Text>
                </Column>
              </Grid>
              
              {favoriteGenres.length > 0 && (
                <>
                  <Line />
                  <Column gap="12">
                    <Row gap="8" vertical="center">
                      <Icon name="star" size="s" onBackground="neutral-medium" />
                      <Text size="s" weight="strong" onBackground="neutral-medium">
                        Favorite Genres
                      </Text>
                    </Row>
                    <Row gap="8" wrap>
                      {favoriteGenres.map((genre) => (
                        <Badge key={genre} >
                          {genre}
                        </Badge>
                      ))}
                    </Row>
                  </Column>
                </>
              )}
            </Column>
          </Card>

          {/* Stats Overview */}
          <Card padding="24" radius="l" fillWidth>
            <Column gap="16">
              <Heading as="h4" variant="heading-default-l">
                Activity Overview
              </Heading>
              <Grid columns={3} gap="16">
                <Card
                  padding="20"
                  radius="m"
                  style={{ background: "var(--surface-elevated)" }}
                >
                  <Column gap="8" horizontal="center">
                    <Row gap="8" vertical="center">
                      <Icon name="film" size="m" onBackground="brand-medium" />
                      <Text size="xl" weight="strong" onBackground="brand-medium">
                        {stats.moviesWatched}
                      </Text>
                    </Row>
                    <Text size="s" onBackground="neutral-weak" align="center">
                      Movies Watched
                    </Text>
                  </Column>
                </Card>
                
                <Card
                  padding="20"
                  radius="m"
                  style={{ background: "var(--surface-elevated)" }}
                >
                  <Column gap="8" horizontal="center">
                    <Row gap="8" vertical="center">
                      <Icon name="star" size="m" onBackground="brand-medium" />
                      <Text size="xl" weight="strong" onBackground="brand-medium">
                        {stats.ratings}
                      </Text>
                    </Row>
                    <Text size="s" onBackground="neutral-weak" align="center">
                      Ratings Given
                    </Text>
                  </Column>
                </Card>
                
                <Card
                  padding="20"
                  radius="m"
                  style={{ background: "var(--surface-elevated)" }}
                >
                  <Column gap="8" horizontal="center">
                    <Row gap="8" vertical="center">
                      <Icon name="book" size="m" onBackground="brand-medium" />
                      <Text size="xl" weight="strong" onBackground="brand-medium">
                        {stats.reviews}
                      </Text>
                    </Row>
                    <Text size="s" onBackground="neutral-weak" align="center">
                      Reviews Written
                    </Text>
                  </Column>
                </Card>
              </Grid>
            </Column>
          </Card>
        </>
      ) : (
        <Card padding="24" radius="l" fillWidth>
          <Column gap="20">
            <Row horizontal="space-between" vertical="center">
              <Heading as="h4" variant="heading-default-l">
                Edit Profile
              </Heading>
              <Button
                variant="secondary"
                size="s"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Row>
            
            <Line />
            
            <Column gap="16">
              <Input
                label="Username"
                defaultValue={user?.username || ""}
                id="username"
                prefixIcon="person"
              />
              
              <Input
                label="Email"
                defaultValue={user?.email || ""}
                id="email"
                type="email"
                prefixIcon="openLink"
              />
              
              <Textarea
                id="bio"
                label="Bio"
                lines={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself, your favorite movies, and what you're watching..."
              />
              
              <TagInput
                id="genres"
                value={favoriteGenres}
                onChange={(newTags: string[]) => {
                  setFavoriteGenres(newTags);
                }}
                label="Favorite Genres"
              />
            </Column>
            
            <Line />
            
            <Row gap="12" horizontal="end">
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </Button>
            </Row>
          </Column>
        </Card>
      )}
    </Column>
  );
}
