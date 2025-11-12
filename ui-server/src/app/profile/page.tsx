'use client';

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Flex, Text, SmartImage, Badge, ToggleButton, Column, Grid } from "@/once-ui/components";


export default function ProfilePage() {

  return (
    <>
    <Header />
    <Column fillWidth paddingY="xl" paddingX="l" flex={1}>
        <Flex direction="column" gap="12" padding="24" fitWidth>
            <Flex horizontal="start" direction="column" gap="1">
                <Text as="h2" size="l" weight="strong" align="start">
                    User Profile
                </Text>
            </Flex>
            <Text size="l" align="start">
                Coming soon!
            </Text>
        </Flex>
    </Column>
    <Footer />
    </>
  );
}
