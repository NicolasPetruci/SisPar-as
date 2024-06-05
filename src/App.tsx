

//Router
import { BrowserRouter, Routes } from "react-router-dom";
import NavbarSistemas from "./components/organismos/NavbarSistema/NavbarSistema";
import { AuthProvider } from "./context/AuthContext";
import Rota from "./routes/Routes";


function App() {


  return (
    <>

      <NavbarSistemas>
        <BrowserRouter>
          <AuthProvider>
              <Rota />
          </AuthProvider>
        </BrowserRouter>
      </NavbarSistemas>

    </>
  )
}

export default App
