import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Card, Group, Badge, ActionIcon, Loader, Flex } from '@mantine/core';
import { IconHeart, IconSparkles, IconMapPin, IconClock } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { fetchLatestSave, UserSaveResponseDto } from '../api/savesApi'; // Adjust path
import horrorLoop from '../assets/scaryUw.mp4';

const Location: React.FC = () => {
  const { user } = useAuth();
  const [saveData, setSaveData] = useState<UserSaveResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      const loadSave = async () => {
        setLoading(true);
        try {
          const data = await fetchLatestSave(user.userId);
          setSaveData(data);
        } catch (error) {
          console.error('Failed to fetch latest save:', error); // Silent fallback for production
          setSaveData(null); // Ensure fallback text shows
        } finally {
          setLoading(false);
        }
      };
      loadSave();
    }
  }, [user?.userId]);

  const lastDiveText = saveData?.timestamp 
    ? format(new Date(saveData.timestamp), 'MMM dd, yyyy p') 
    : 'Unknown Dive';

  return (
    <section id="location" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3,
          zIndex: 0,
        }}
      >
        <source src={horrorLoop} type="video/mp4" />
      </video>
      <Container py={80} fluid style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.5)' }}>
        <Title
          order={2}
          size={48}
          c="seaGreen.0"
          ta="center"
          mb={40}
          style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
        >
          Locations
        </Title>
        <Text size="lg" c="gray.2" maw={800} mx="auto" ta="center" mb={40}>
          Explore underwater ruins filled with Lovecraftian horrors
        </Text>

        {user ? (
          loading ? (
            <Group justify="center" mt={40}>
              <Loader color="seaGreen.0" size="xl" />
              <Text c="gray.2">Syncing your abyss dive...</Text>
            </Group>
          ) : saveData ? (
            <Card
              shadow="sm"
              p={{ base: 'sm', sm: 'md' }} // Responsive padding for sizing
              radius="md"
              withBorder
              bg="#1d1e30"
              c="#d5d7e0"
              mt={40}
              w="100%"
              style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
            >
              <Title order={4} c="seaGreen.0" mb={20} ta="center">
                Latest Progress: {saveData.sceneName}
              </Title>
              <Flex justify="space-between" mb={16} direction={{ base: 'column', sm: 'row' }} gap="sm">
                <Group gap="xs">
                  <ActionIcon variant="subtle" c="seaGreen.0" size="sm">
                    <IconHeart size={16} />
                  </ActionIcon>
                  <div>
                    <Text size="sm" c="gray.2">Health</Text>
                    <Text size="md" fw={500}>{saveData.health}/500</Text>
                  </div>
                </Group>
                <Group gap="xs">
                  <ActionIcon variant="subtle" c="seaGreen.0" size="sm">
                    <IconSparkles size={16} />
                  </ActionIcon>
                  <div>
                    <Text size="sm" c="gray.2">Mana</Text>
                    <Text size="md" fw={500}>{saveData.mana}/250</Text>
                  </div>
                </Group>
              </Flex>
              <Flex justify="apart" mb={16} direction={{ base: 'column', sm: 'row' }} gap="sm">
                <Group gap="xs">
                  <ActionIcon variant="subtle" c="seaGreen.0" size="sm">
                    <IconMapPin size={16} />
                  </ActionIcon>
                  <div>
                    <Text size="sm" c="gray.2">Position</Text>
                    <Text size="sm">
                      X: {saveData.position.x.toFixed(1)}, Y: {saveData.position.y.toFixed(1)}, Z: {saveData.position.z.toFixed(1)}
                    </Text>
                  </div>
                </Group>
                <Badge variant="light" c="seaGreen.0" leftSection={<IconClock size={14} />}>
                  Last Dive: {lastDiveText}
                </Badge>
              </Flex>
            </Card>
          ) : (
            <Text c="gray.2" ta="center" mt={40}>
              No progress synced yet. Dive in and save your terror!
            </Text>
          )
        ) : (
          <Text c="gray.2" ta="center" mt={40}>
            Log in to sync your deepest fears across the abyss.
          </Text>
        )}
      </Container>
    </section>
  );
};

export default Location;