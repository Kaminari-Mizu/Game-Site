import { useEffect, useState } from 'react';
import { Burger, Group, Transition, Paper, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link as ScrollLink } from 'react-scroll'; // Import react-scroll Link
import classes from '../Styling/HeaderSearch.module.scss';

const links = [
    { link: 'hero', label: 'Home' },
    { link: 'about', label: 'About' },
    { link: 'characters', label: 'Characters' },
    { link: 'location', label: 'Location' },
    { link: 'gameMechanics', label: 'Gameplay' },
    { link: 'download', label: 'Download' },
];

export function HeaderSearch() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState('hero');
    const theme = useMantineTheme();
    const isAboveSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true, {
        getInitialValueInEffect: false,
    });

    useEffect(() => {
        if (isAboveSm && opened) {
            close();
        }
    }, [isAboveSm, opened, close]);

    const items = links.map((link) => (
        <ScrollLink
            key={link.label}
            to={link.link}
            smooth={true}
            duration={800}
            offset={-70} // Adjust for fixed navbar height
            className={classes.link}
            activeClass={classes.active}
            onClick={() => {
                setActive(link.link);
                close();
            }}
        >
            {link.label}
        </ScrollLink>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group wrap="nowrap">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        hiddenFrom="sm"
                        className={classes.burger}
                    />
                    <Text size="xl" fw={700} c="seaGreen.0" style={{ fontFamily: "'Yuji Syuku', sans-serif" }}>
                        Underwater Horror RPG
                    </Text>
                    <Transition
                        mounted={opened}
                        transition="pop-top-right"
                        duration={200}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <Paper style={styles} className={classes.dropdown}>
                                <Group className={classes['links-group']}>
                                    {items}
                                </Group>
                            </Paper>
                        )}
                    </Transition>
                </Group>
                <Group className={classes.links} visibleFrom="sm">
                    {items}
                </Group>
            </div>
        </header>
    );
}