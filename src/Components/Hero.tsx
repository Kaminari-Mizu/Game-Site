import React from 'react'
import {Image, Title, Text, Button, Stack} from '@mantine/core';
import placeholderHero from '../assets/horrorPreivew.jpg';
import {Link as ScrollLink } from 'react-scroll';

const Hero: React.FC = () => {
    return(
            <section id="hero" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <Image
                src={placeholderHero}
                alt="Underwater Horror"
                height="100vh"
                fit="cover"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.7 }}
            />
            <Stack align="center" justify="center" style={{ position: 'absolute', inset: 0, height: '100%' }}>
                <Title
                    order={1}
                    size={72} // Larger for RE4 bold look
                    c="white"
                    fw={700}
                    tt="uppercase"
                    ta="center"
                    style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)', fontFamily:"'Yuji Syuku', sans-serif !important" }}
                >
                    Underwater Horror RPG
                </Title>
                <Text size="xl" c="gray.2" ta="center" style={{ fontFamily: "'Yuji Syuku', sans-serif" }}>
                    Tagline
                </Text>
                <Button component={ScrollLink} to="about" smooth={true} duration={800} size="lg" radius="md" color="seaGreen.0">
                    Learn More
                </Button>
            </Stack>
        </section>
    );
};

export default Hero