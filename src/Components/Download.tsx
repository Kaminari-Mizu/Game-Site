import React from "react";
import { Container, Title, Text, Button } from '@mantine/core';
import horrorLoop from '../assets/Cthulhu3.mp4'

const Download: React.FC = () => {
    return (
        <section id="download" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
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
            <Container py={80} bg="abyss.2" fluid>
                <Title
                    order={2}
                    size={48}
                    c="seaGreen.0"
                    ta="center"
                    mb={20}
                    style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
                >
                    Download
                </Title>
                <Text size="lg" c="gray.2" ta="center" mb={20}>
                    Available November 2025
                </Text>
                <Button disabled size="lg" radius="md" color="seaGreen.0" mx="auto" display="block" maw={200}>
                    Coming Soon
                </Button>
            </Container>
        </section>
    )
}

export default Download;