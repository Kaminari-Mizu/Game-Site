import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  primaryColor: 'abyss',
  colors: {
    abyss: [
      '#0a0f1c',
      '#141a2f',
      '#1f263d',
      '#2e354b',
      '#3d4459',
      '#4c5367',
      '#5b6275',
      '#6a7183',
      '#798091',
      '#88909f',
    ],
    seaGreen: [
      '#66CDAA',
      '#5CB89A',
      '#52A38A',
      '#488E7A',
      '#3E796A',
      '#34645A',
      '#2A4F4A',
      '#203A3A',
      '#16252A',
      '#0C101A',
    ],
  },
  fontFamily: "'Yuji Syuku', sans-serif",
  fontFamilyMonospace: "'Yuji Syuku', monospace",
  components: {
    Modal: {
      defaultProps: {
        zIndex: 10000, // Increased to avoid conflicts
        centered: true,
      },
      styles: {
        inner: {
          zIndex: 10000, // Ensure inner container is above other elements
          position: 'fixed', // Explicit positioning
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          backgroundColor: '#1d1e30',
          color: '#d5d7e0',
          zIndex: 10001, // Above inner
        },
        header: {
          backgroundColor: '#1d1e30',
          color: '#d5d7e0',
        },
        title: {
          color: '#d5d7e0',
        },
        body: {
          backgroundColor: '#1d1e30',
          color: '#d5d7e0',
        },
      },
    },
    Paper: {
      styles: {
        root: { backgroundColor: '#1d1e30', color: '#d5d7e0' },
      },
    },
    TextInput: {
      styles: {
        label: { color: '#d5d7e0' },
        input: { backgroundColor: '#2b2c3d', color: '#d5d7e0', borderColor: '#4d4f66' },
        error: { color: '#ff6b6b' },
      },
    },
    Button: {
      styles: {
        root: { color: '#d5d7e0' },
      },
    },
    Text: {
      styles: {
        root: { color: '#d5d7e0' },
      },
    },
    Notification: {
      styles: {
        root: { backgroundColor: '#2b2c3d', color: '#d5d7e0' },
        title: { color: '#d5d7e0' },
        description: { color: '#d5d7e0' },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>
);