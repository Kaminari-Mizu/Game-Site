import { Container, Text } from "@mantine/core";

function Footer() {
    return(
        <Container py={20} bg='black' fluid>
            <Text size="sm" c="gray.5" ta="center">
            © 2025 Underwater Horror RPG. All rights reserved.
            </Text>
        </Container>
    )
}

export default Footer;