import { HeaderSearch } from './Components/HeaderSearch'
import Home from './Components/Home'
import { MantineProvider } from '@mantine/core'



function App() {
  

  return (
    <MantineProvider>
      <HeaderSearch/>
      <Home/>
    </MantineProvider>
  )
}

export default App
