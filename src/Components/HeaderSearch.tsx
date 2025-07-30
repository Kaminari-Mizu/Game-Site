import { useEffect, useState } from 'react';
import { Burger, Group, Transition, Paper, Text, Modal, Menu, ActionIcon, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Link as ScrollLink } from 'react-scroll';
import { IconUser, IconLogout } from '@tabler/icons-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../context/AuthContext';
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
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
  const [active, setActive] = useState('hero');
  const theme = useMantineTheme();
  const isAboveSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true, {
    getInitialValueInEffect: false,
  });
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  useEffect(() => {
    if (isAboveSm && opened) {
      close();
    }
  }, [isAboveSm, opened, close]);

  useEffect(() => {
    console.log('User State:', user);
  },[user]) 

  const handleSignOut = () => {
    logout();
    setActive('hero'); // Reset active link
  };

  const items = [
    ...links.map((link) => (
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
    )),
    user ? (
      <Menu key="profile" shadow="md" width={200}>
        <Menu.Target>
          <Group gap={8} style={{ cursor: 'pointer' }}>
            <ActionIcon
              variant="transparent"
              color="seaGreen.0"
              onClick={() => setActive('profile')}
              aria-label="Profile"
            >
              <IconUser size={18} />
            </ActionIcon>
            <Text
              c={active === 'profile' ? 'seaGreen.0' : 'gray.2'}
              style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
            >
              {user.userName || 'User'}
            </Text>
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconLogout size={14} />}
            onClick={handleSignOut}
          >
            Sign Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ) : (
      [
        <Text
          key="login"
          component="button"
          className={classes.link}
          c={active === 'login' ? 'seaGreen.0' : 'gray.2'}
          onClick={() => {
            setActive('login');
            setLoginModalOpened(true);
            setRegisterModalOpened(false);
            close();
          }}
          style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
        >
          Login
        </Text>,
        <Text
          key="register"
          component="button"
          className={classes.link}
          c={active === 'register' ? 'seaGreen.0' : 'gray.2'}
          onClick={() => {
            setActive('register');
            setRegisterModalOpened(true);
            setLoginModalOpened(false);
            close();
          }}
          style={{ fontFamily: "'Yuji Syuku', sans-serif" }}
        >
          Register
        </Text>,
      ]
    ),
  ];

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