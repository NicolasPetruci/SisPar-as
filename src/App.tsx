//React
import React from "react"

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from "./components/paginas/Home-Site/Teste";
import LoginSistema from "./components/paginas/Login-Sistema/Login-Sistema";

function App() {


  return (
    <>

      <BrowserRouter>

        <Routes>
          {/* Telas Iniciais */}
          <Route path="/teste" element={<Teste />} />
          <Route path="/" element={<LoginSistema />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
