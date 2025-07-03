import React, { useState } from 'react';
import { Container, Title, SimpleGrid, Image, Text, Group, Box } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import protag from '../assets/protagPh.jpg';
import protagPortrait from '../assets/protagPh_portrait.jpg';
import companion from '../assets/mermaidPh.jpg';
import companionPortrait from '../assets/mermaidPh_portrait.jpg';
import boss from '../assets/bossPh.jpg';
import bossPortrait from '../assets/bossPh_portrait.jpg';
import horrorloop from '../assets/DarkOcean.mp4';
import styles from '../Styling/Characters.module.css'; // Import CSS module

interface Character {
    name: string;
    portrait: string;
    image: string;
    description: string;
}

const characters: Character[] = [
    {
        name: 'Protagonist',
        portrait: protagPortrait,
        image: protag,
        description: 'Protag of the game',
    },
    {
        name: 'Companion',
        portrait: companionPortrait,
        image: companion,
        description: 'Protags companion',
    },
    {
        name: 'Demo Boss',
        portrait: bossPortrait,
        image: boss,
        description: 'Boss of the game demo',
    },
];

const Characters: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState<Character>(characters[0]);

    return (
        <section id="characters" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
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
                    opacity: 1.0,
                    zIndex: 0,
                    filter: 'brightness(150%)',
                }}
            >
                <source src={horrorloop} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Container py={80} fluid style={{ position: 'relative', zIndex: 1, background: 'rgba(0, 0, 0, 0.5)' }}>
                <Title
                    order={2}
                    size={48}
                    c="seaGreen.0"
                    ta="center"
                    mb={40}
                    style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
                >
                    Characters
                </Title>
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb={40} style={{ maxWidth: 400, mx: 'auto' }}>
                    {characters.map((character) => {
                        const { hovered, ref } = useHover();
                        return (
                            <Box
                                key={character.name}
                                ref={ref}
                                onClick={() => setSelectedChar(character)}
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: selectedChar.name === character.name ? '2px solid #66CDAA' : '2px solid transparent',
                                    background: selectedChar?.name === character.name ? 'rgba(102, 205, 170, 0.1)' : 'transparent',
                                    transition: 'transform 0.3s ease, background 0.3s ease',
                                    transform: hovered ? 'scale(1.1)' : 'scale(1)',
                                }}
                            >
                                <Image
                                    src={character.portrait}
                                    height={100}
                                    width={100}
                                    alt={character.name}
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        );
                    })}
                </SimpleGrid>
                <Group
                    key={selectedChar.name}
                    className={styles.fadeIn}
                    align="flex-start"
                    gap="lg"
                    maw={800}
                    mx="auto"
                >
                    <Image
                        src={selectedChar?.image}
                        height={400}
                        width={300}
                        alt={selectedChar?.name}
                        style={{ objectFit: 'contain' }}
                    />
                    <Box>
                        <Text
                            size="xl"
                            c="seaGreen.0"
                            style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
                            mb={10}
                        >
                            {selectedChar?.name}
                        </Text>
                        <Text size="lg" c="gray.2">
                            {selectedChar?.description}
                        </Text>
                    </Box>
                </Group>
            </Container>
        </section>
    );
};

export default Characters;