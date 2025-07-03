import React from "react";
import { Container, Title, Text } from "@mantine/core";
import horrorLoop from '../assets/Cthulhu2.mp4'

const About: React.FC = () => {
    return (
        <section id="about" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
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
                    opacity: 0.3, // Subtle opacity to ensure text readability
                    zIndex: 0,
                }}
            >
                <source src={horrorLoop} type="video/mp4" />
            </video>
            <Container py={80} fluid style={{ position: 'relative', zIndex: 1, background: 'rgba(0, 0, 0, 0.5)' }}>
                <Title
                    order={2}
                    size={48}
                    c="seaGreen.0"
                    ta="center"
                    mb={20}
                    style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
                >
                    About the Game
                </Title>
                <Text size="lg" c="gray.2" ta="center" maw={800} mx="auto">
                    Explore a sunken temple, battle eldritch horrors, and survive the abyss in this Lovecraftian underwater horror RPG. Uncover ancient secrets as you dive deeper into the unknown.
                </Text>
            </Container>
        </section>
    )
}

export default About;