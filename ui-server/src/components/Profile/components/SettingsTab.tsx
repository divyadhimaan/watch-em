'use client';

import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  Card,
  Line,
  Switch,
} from "@/once-ui/components";

interface SettingsTabProps {
  publicProfile: boolean;
  setPublicProfile: (value: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
}

export function SettingsTab({
  publicProfile,
  setPublicProfile,
  emailNotifications,
  setEmailNotifications,
}: SettingsTabProps) {
  return (
    <Column fillWidth gap="16">
      <Card padding="24" radius="l" fillWidth>
        <Column gap="24">
          <Heading as="h4" variant="heading-default-m">
            Account Settings
          </Heading>
          
          <Line />
          
          <Column gap="16">
            <Row horizontal="space-between" vertical="center">
              <Column gap="4">
                <Text weight="strong">Public Profile</Text>
                <Text size="s" onBackground="neutral-weak">
                  Allow others to view your profile
               </Text>
              </Column>
              <Switch
                isChecked={publicProfile}
                onToggle={() => setPublicProfile(!publicProfile)}
              />
            </Row>
            
            <Line />
            
            <Row horizontal="space-between" vertical="center">
              <Column gap="4">
                <Text weight="strong">Email Notifications</Text>
                <Text size="s" onBackground="neutral-weak">
                  Receive email updates about your activity
                  </Text>
              </Column>
              <Switch
                isChecked={emailNotifications}
                onToggle={() => setEmailNotifications(!emailNotifications)}
              />
            </Row>
          </Column>
          
          <Line />
          
          <Column gap="12">
            <Button
              variant="secondary"
              prefixIcon="security"
              fillWidth
              disabled={true}
            >
              Change Password
            </Button>
            
            <Button
              variant="secondary"
              prefixIcon="person"
              fillWidth
              disabled={true}
            >
              Privacy Settings
            </Button>
          </Column>
        </Column>
      </Card>
    </Column>
  );
}
