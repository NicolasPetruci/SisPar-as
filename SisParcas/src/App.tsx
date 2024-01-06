//React
import React from "react"

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSite from "./paginas/Home-Site/Home-Site";

function App() {


  return (
    <>

      <BrowserRouter>

        <Routes>
          {/* Telas Iniciais */}
          <Route path="/" element={<HomeSite />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
