

//Router
import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Rota from "./routes/Routes";


function App() {


  return (
    <>


      <BrowserRouter>
        <AuthProvider>
          <Rota />
        </AuthProvider>
      </BrowserRouter>


    </>
  )
}

export default App
