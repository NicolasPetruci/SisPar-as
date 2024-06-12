//chakra
import {
  ColorModeScript, ThemeConfig, extendBaseTheme,
} from '@chakra-ui/react'

import { ChakraProvider } from '@chakra-ui/react'

//React
import React from 'react'
import ReactDOM from 'react-dom/client'

//Componentes
import App from './App.tsx'

//Main css
import "./css/main.css";



//Definição de Temas & Modos
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}
const theme = extendBaseTheme({

  colors: {
    cor: {
      P1: "#6D65A7",
      P2: "#462271",
      P3: "#EFF7FA",
      P4: "#F5CC22",
      P5: "#0E0E0E",
    }

  }
}, { config })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>

      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />

    </React.StrictMode>
  </ChakraProvider>
)
