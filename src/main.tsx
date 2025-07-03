import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark' theme={{
      colors: {
        'abyss': ['#0a0f1c', '#141a2f', '#1f263d', '#2e354b', '#3d4459', '#4c5367', '#5b6275', '#6a7183', '#798091', '#88909f'],
            'seaGreen': ['#66CDAA', '#5CB89A', '#52A38A', '#488E7A', '#3E796A', '#34645A', '#2A4F4A', '#203A3A', '#16252A', '#0C101A'],
      },
      primaryColor: 'abyss',
      fontFamily: "'Yuji Syuku', sans-serif", //For Headings
      fontFamilyMonospace: "'Yuji Syuku', monospace", //Optional
    }}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MantineProvider>
  </StrictMode>
  ,
)
