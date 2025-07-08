import { HeaderSearch } from './Components/HeaderSearch'
import Home from './Components/Home'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './context/AuthContext'



function App() {
  

  return (
        <MantineProvider>
      <AuthProvider>
        <HeaderSearch />
        <Home />
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
