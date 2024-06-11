

//Router
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Rota from "./routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";


function App() {


  return (
    <>


      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider>
          <Rota />
          </ChakraProvider>
          
        </AuthProvider>
      </BrowserRouter>


    </>
  )
}

export default App
