"use client";

import React, { useState } from "react";

import {
  Heading,
  Text,
  Button,
  Icon,
  InlineCode,
  Logo,
  Input,
  Avatar,
  AvatarGroup,
  Textarea,
  PasswordInput,
  SegmentedControl,
  SmartLink,
  Dialog,
  Feedback,
  Line,
  LogoCloud,
  Background,
  Select,
  Card,
  Fade,
  StatusIndicator,
  TagInput,
  Switch,
  Column,
  Row,
} from "@/once-ui/components";
import { CodeBlock, MediaUpload } from "@/once-ui/modules";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CarouselCards } from "@/components/carouselCards";
import { Filter } from "@/components/filter"
import { MovieScroll } from "@/components/movieScroll";
import Scroll from "@/components/scroll";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [firstDialogHeight, setFirstDialogHeight] = useState<number>();
  const [intro, setIntro] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState<string[]>(["UX / UI", "Design systems", "AI / ML"]);
  const [twoFA, setTwoFA] = useState(false);

  const handleSelect = (value: string) => {
    console.log("Selected option:", value);
    setSelectedValue(value);
  };

  const links = [
    {
      href: "https://once-ui.com/docs/theming",
      title: "Themes",
      description: "Style your app in minutes",
    },
    {
      href: "https://once-ui.com/docs/RowComponent",
      title: "Layout",
      description: "Build responsive layouts",
    },
    {
      href: "https://once-ui.com/docs/typography",
      title: "Typography",
      description: "Scale text automatically",
    },
  ];

  const validateIntro = (value: React.ReactNode) => {
    if (typeof value === "string" && value.length < 10) {
      return (
        <Row horizontal="center" marginBottom="12" gap="8">
          <Icon name="errorCircle" />
          Intro must be at least 10 characters long.
        </Row>
      );
    }
    return null;
  };

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
      
      
      <Column
        overflow="hidden"
        as="main"
        maxWidth="xl"
        position="relative"
        radius="xl"
        horizontal="center"
        border="neutral-alpha-weak"
        fillWidth
      >
        <CarouselCards />
        <Filter />
        <Scroll />
        
        {/* <Column
          fillWidth
          horizontal="center"
          gap="48"
          radius="xl"
          paddingTop="80"
          position="relative"
        >
          
          <Background
            mask={{
              x: 0,
              y: 48,
            }}
            position="absolute"
            grid={{
              display: true,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{
              x: 80,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              tilt: -35,
              height: 50,
              width: 75,
              x: 100,
              y: 40,
              colorStart: "accent-solid-medium",
              colorEnd: "static-transparent",
            }}
          />
          <Background
            mask={{
              x: 100,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              opacity: 100,
              tilt: -35,
              height: 20,
              width: 120,
              x: 120,
              y: 35,
              colorStart: "brand-solid-strong",
              colorEnd: "static-transparent",
            }}
          />
          <Column fillWidth horizontal="center" gap="32" padding="32" position="relative">
            <InlineCode radius="xl" shadow="m" fit paddingX="16" paddingY="8">
              Start by editing
              <Text onBackground="brand-medium" marginLeft="8">
                app/page.tsx
              </Text>
            </InlineCode>
            <Heading wrap="balance" variant="display-default-l" align="center" marginBottom="16">
              We let designers code and developers design
            </Heading>
            <Button
              id="readDocs"
              target="_blank"
              label="Open docs"
              href="https://once-ui.com/docs"
              variant="secondary"
              arrowIcon
            />
            <Column horizontal="center" paddingTop="64" fillWidth gap="24">
              <Line maxWidth={4} marginBottom="16" background="neutral-alpha-medium" />
              <AvatarGroup
                marginBottom="8"
                reverse
                size="s"
                avatars={[
                  {
                    src: "/images/l.jpg",
                  },
                  {
                    src: "/images/z.jpg",
                  },
                ]}
              />
              <Heading marginBottom="12" as="h2" align="center" variant="heading-default-l">
                Brought to you by indie creators
                <br /> behind stellar projects:
              </Heading>
              <LogoCloud
                paddingBottom="104"
                columns="3"
                mobileColumns="1"
                limit={3}
                fillWidth
                logos={[
                  {
                    icon: false,
                    wordmarkSrc: "/trademark/dopler-wordmark.svg",
                    href: "https://dropler.app",
                    size: "m",
                  },
                  {
                    icon: false,
                    wordmarkSrc: "/trademark/design-engineers-wordmark.svg",
                    href: "https://club.dropler.io",
                    size: "m",
                  },
                  {
                    icon: false,
                    wordmarkSrc: "/trademark/enroll-wordmark.svg",
                    href: "https://enroll.dopler.app",
                    size: "m",
                  },
                  {
                    icon: false,
                    wordmarkSrc: "/trademark/magic-portfolio-wordmark.svg",
                    href: "https://magic-portfolio.com",
                    size: "m",
                  },
                ]}
              />
            </Column>
          </Column>
          <Column fillWidth paddingX="32" gap="12" horizontal="center" position="relative">
            <Heading as="h2" variant="display-default-m">
              Showcase
            </Heading>
            <Text marginBottom="32" align="center" onBackground="neutral-weak">
              Tiny snippets to inspire your next project
            </Text>

          </Column>
        </Column> */}


        {/* PROFILE */}
        {/* <Row
          horizontal="center"
          paddingX="32"
          paddingY="64"
          fillWidth
          gap="32"
          position="relative"
        >
          <Background
            mask={{
              cursor: true,
            }}
            dots={{
              display: true,
              opacity: 50,
              color: "neutral-solid-strong",
              size: "48",
            }}
            fill
            position="absolute"
            gradient={{
              display: true,
              opacity: 100,
              tilt: 0,
              height: 100,
              width: 200,
              x: 50,
              y: 0,
              colorStart: "neutral-background-medium",
              colorEnd: "static-transparent",
            }}
          />
          <Column maxWidth={32} gap="-1">
            <Feedback icon variant="success" vertical="center" radius={undefined} topRadius="l" zIndex={1}>
              Your profile is public.
            </Feedback>
            <Column
              background="page"
              radius={undefined}
              bottomRadius="l"
              overflow="hidden"
              position="relative"
              fillWidth
              horizontal="center"
              border="neutral-medium"
            >
              <MediaUpload
                border={undefined}
                emptyState={<Row paddingBottom="80">Drag and drop or click to browse</Row>}
                position="absolute"
                aspectRatio="16 / 9"
                sizes="560px"
                radius={undefined}
                initialPreviewImage="/images/profile.jpg"
              />
              <Column
                paddingTop="160"
                paddingX="32"
                paddingBottom="32"
                fillWidth
                position="relative"
                horizontal="center"
                gap="8"
              >
                <Avatar
                  zIndex={1}
                  style={{
                    border: "8px solid var(--page-background)",
                  }}
                  size="xl"
                  src="/images/l.jpg"
                />
                <Heading marginTop="24" as="h3" variant="display-default-m">
                  Lorant One
                </Heading>
                <Text align="center" onBackground="neutral-weak" marginBottom="24">
                  165 connections
                </Text>
                <SegmentedControl
                  onToggle={(value) => console.log("SegmentedControl changed", value)}
                  buttons={[
                    {
                      size: "l",
                      value: "profile",
                      label: "Profile",
                    },
                    {
                      size: "l",
                      value: "settings",
                      label: "Settings",
                    },
                    {
                      size: "l",
                      value: "notifications",
                      label: (
                        <Row gap="8">
                          Notifications
                          <StatusIndicator size="s" color="cyan" />
                        </Row>
                      ),
                    },
                    {
                      size: "l",
                      value: "integrations",
                      label: "Integrations",
                    },
                    {
                      size: "l",
                      value: "inbox",
                      label: "Inbox",
                    },
                    {
                      size: "l",
                      value: "requests",
                      label: "Requests",
                    },
                  ]}
                />
                <Column paddingY="32" fillWidth gap="-1">
                  <Input
                    radius="top"
                    label="Name"
                    labelAsPlaceholder
                    defaultValue="Lorant One"
                    id="name"
                  />
                  <Input
                    radius="bottom"
                    label="Email"
                    labelAsPlaceholder
                    defaultValue="lorant@once-ui.com"
                    id="profileEmail"
                  />
                </Column>
                <Textarea
                  id="intro"
                  label="Intro"
                  lines="auto"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  validate={validateIntro}
                />
                <TagInput
                  id="interests"
                  value={tags}
                  onChange={(newTags: string[]) => {
                    setTags(newTags);
                  }}
                  label="Interests"
                />
                <Select
                  searchable
                  labelAsPlaceholder
                  id="select"
                  label="Country"
                  value={selectedValue}
                  options={[
                    {
                      value: "Austria",
                      label: "Austria",
                      onClick: (value) => console.log("Visiblity set: ", value),
                    },
                    {
                      value: "Finland",
                      label: "Finland",
                      onClick: (value) => console.log("Visiblity set: ", value),
                    },
                    {
                      value: "New Zeland",
                      label: "New Zeland",
                      onClick: (value) => console.log("Visiblity set: ", value),
                    },
                    {
                      value: "Norway",
                      label: "Norway",
                      onClick: (value) => console.log("Visiblity set: ", value),
                    },
                    {
                      value: "United Kingdom",
                      label: "United Kingdom",
                      onClick: (value) => console.log("Visiblity set: ", value),
                    },
                    {
                      value: "United States",
                      label: "United States",
                      onClick: (value) => console.log("Visiblity set: ", value),
                    },
                  ]}
                  onSelect={handleSelect}
                />
                <Button
                  className="mt-32"
                  prefixIcon="security"
                  variant="secondary"
                  onClick={() => setIsFirstDialogOpen(true)}
                >
                  Password and security
                </Button>
              </Column>
            </Column>
          </Column>
        </Row> */}

        {/* CODE PREVIEW */}
        {/* <TiltFx fillWidth paddingX="32" paddingTop="64">
          <Column
            border="neutral-alpha-weak"
            paddingX="32"
            radius="xl"
            overflow="hidden"
            paddingY="160"
            fillWidth
            position="relative"
          >
            <Background
              mask={{
                x: 100,
                y: 0,
              }}
              position="absolute"
              grid={{
                display: true,
                color: "neutral-alpha-medium",
                width: "2rem",
                height: "2rem",
              }}
            />
            <Background
              mask={{
                x: 0,
                y: 100,
                radius: 100,
              }}
              position="absolute"
              grid={{
                display: true,
                color: "brand-alpha-strong",
                width: "12",
                height: "12",
              }}
              gradient={{
                display: true,
                opacity: 100,
                height: 100,
                width: 100,
                tilt: 0,
                x: 0,
                y: 100,
                colorStart: "brand-solid-strong",
                colorEnd: "brand-background-medium",
              }}
            />
            <Column horizontal="center" gap="48" fillWidth position="relative">
              <Heading align="center" as="h2" variant="display-default-l">
                Quick start
              </Heading>
              <CodeBlock
                compact
                maxWidth={40}
                codeInstances={[
                  {
                    code: `git clone https://github.com/once-ui-system/nextjs-starter.git`,
                    language: "tsx",
                    label: "tsx",
                  },
                ]}
              />
            </Column>
          </Column>
        </TiltFx> */}

        {/* <Row
          position="relative"
          fillWidth
          paddingX="32"
          paddingTop="160"
          minHeight={28}
          paddingBottom="80"
          horizontal="center"
          vertical="end"
        >
          <Background
            mask={{
              x: 50,
              y: 100,
            }}
            position="absolute"
            grid={{
              display: true,
              width: "0.25rem",
              color: "brand-alpha-strong",
              height: "0.25rem",
            }}
          />
          <Row position="relative" textVariant="display-default-m" align="center">
            Learn more
          </Row>
        </Row>
        <Row fillWidth overflow="hidden">
          <Row maxWidth="32" borderTop="neutral-alpha-weak" borderBottom="neutral-medium"></Row>
          <Row fillWidth border="neutral-alpha-weak" mobileDirection="column">
            {links.map((link, index) => (
              <SmartLink unstyled fillWidth target="_blank" key={link.href} href={link.href}>
                <Card
                  fillWidth
                  padding="40"
                  gap="8"
                  direction="column"
                  background={undefined}
                  borderRight={index < links.length - 1 ? "neutral-alpha-weak" : undefined}
                  border={undefined}
                  radius={undefined}
                >
                  <Row fillWidth center gap="12">
                    <Text variant="body-strong-m" onBackground="neutral-strong">
                      {link.title}
                    </Text>
                    <Icon size="s" name="arrowUpRight" />
                  </Row>
                  <Text align="center" variant="body-default-s" onBackground="neutral-weak">
                    {link.description}
                  </Text>
                </Card>
              </SmartLink>
            ))}
          </Row>
          <Row maxWidth="32" borderTop="neutral-alpha-weak" borderBottom="neutral-medium"></Row>
        </Row> */}

        <Footer />

      </Column>

      {/* <Dialog
        isOpen={isFirstDialogOpen}
        onClose={() => setIsFirstDialogOpen(false)}
        title="Account details"
        description="Manage your security settings and password."
        base={isSecondDialogOpen}
        onHeightChange={(height) => setFirstDialogHeight(height)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsFirstDialogOpen(false)}>
              Close
            </Button>
          </>
        }
      >
        <Column paddingTop="24" fillWidth gap="24">
          <Switch
            reverse
            isChecked={twoFA}
            onToggle={() => setTwoFA(!twoFA)}
            label="2FA"
            description="Enable two factor authentication"
          />
          <Button onClick={() => setIsSecondDialogOpen(true)}>Change password</Button>
        </Column>
      </Dialog>
      <Dialog
        isOpen={isSecondDialogOpen}
        onClose={() => setIsSecondDialogOpen(false)}
        title="Change password"
        stack
        description="Choose a new password for your account."
        minHeight={firstDialogHeight}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsSecondDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsSecondDialogOpen(false)}>Save</Button>
          </>
        }
      >
        <PasswordInput id="resetPassword" label="New password" />
      </Dialog> */}
    </Column>
  );
}