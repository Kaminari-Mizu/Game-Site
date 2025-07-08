import { useEffect, useState } from 'react';
import { Burger, Group, Transition, Paper, Text, Modal, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link as ScrollLink } from 'react-scroll';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import classes from '../Styling/HeaderSearch.module.scss';

const links = [
  { link: 'hero', label: 'Home' },
  { link: 'about', label: 'About' },
  { link: 'characters', label: 'Characters' },
  { link: 'location', label: 'Location' },
  { link: 'gameMechanics', label: 'Gameplay' },
  { link: 'download', label: 'Download' },
  { link: 'login', label: 'Login', isModal: true },
  { link: 'register', label: 'Register', isModal: true },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
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

  useEffect(() => {
    console.log('Login Modal Opened:', loginModalOpened);
    console.log('Register Modal Opened:', registerModalOpened);
    if (loginModalOpened || registerModalOpened) {
      console.log('Modal should be visible. Check DOM for .mantine-Modal-content');
    }
  }, [loginModalOpened, registerModalOpened]);

  const items = links.map((link) =>
    link.isModal ? (
      <Text
        key={link.label}
        component="button"
        className={classes.link}
        c={active === link.link ? 'seaGreen.0' : 'gray.2'}
        onClick={() => {
          setActive(link.link);
          if (link.link === 'login') {
            setLoginModalOpened(true);
            setRegisterModalOpened(false);
          } else if (link.link === 'register') {
            setRegisterModalOpened(true);
            setLoginModalOpened(false);
          }
          close();
        }}
        style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
      >
        {link.label}
      </Text>
    ) : (
      <ScrollLink
        key={link.label}
        to={link.link}
        smooth={true}
        duration={800}
        offset={-70}
        className={classes.link}
        activeClass={classes.active}
        onClick={() => {
          setActive(link.link);
          close();
        }}
      >
        {link.label}
      </ScrollLink>
    )
  );

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
                <Group className={classes['links-group']}>{items}</Group>
              </Paper>
            )}
          </Transition>
        </Group>
        <Group className={classes.links} visibleFrom="sm">
          {items}
        </Group>
      </div>
      <Modal
        opened={loginModalOpened}
        onClose={() => setLoginModalOpened(false)}
        title={<Text size="xl" fw={700} c="seaGreen.0">Login</Text>}
        size="sm"
        overlayProps={{ opacity: 0.7, blur: 3, bg: '#0a0f1c' }}
      >
        <LoginForm
          closeModal={() => setLoginModalOpened(false)}
          openRegisterModal={() => setRegisterModalOpened(true)}
        />
      </Modal>
      <Modal
        opened={registerModalOpened}
        onClose={() => setRegisterModalOpened(false)}
        title={<Text size="xl" fw={700} c="seaGreen.0">Register</Text>}
        size="sm"
        overlayProps={{ opacity: 0.7, blur: 3, bg: '#0a0f1c' }}
      >
        <RegisterForm
          closeModal={() => setRegisterModalOpened(false)}
          openLoginModal={() => setLoginModalOpened(true)}
        />
      </Modal>
    </header>
  );
}