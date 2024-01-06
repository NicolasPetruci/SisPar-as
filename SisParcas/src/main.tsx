//chakra
import {
  ChakraProvider, ColorModeScript, ThemeConfig, extendBaseTheme
} from '@chakra-ui/react'

//React
import React from 'react'
import ReactDOM from 'react-dom/client'

//Componentes
import App from './App.tsx'

//Main css
import "./css/main.css";



//Definição de Temas & Modos
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
}
const theme = extendBaseTheme({
  colors: {
    cor: {
      P1: "#a507e8",
      P2: "#62068a",
      P3: "#36024d",
      P4: "#190024",
      S1: "#ffd000",
      S2: "#cca700",
      S3: "#967b03",
      S4: "#5e4d02",
      T1: "#e6e6e6",
      T2: "#b3b2b1",
      T3: "#70706f",
      T4: "#383838",
    }

  }
}, { config })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
