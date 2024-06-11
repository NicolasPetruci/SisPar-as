import { Route, Routes } from "react-router-dom";
import Teste from "../components/paginas/Teste/Teste";
import LoginSistema from "../components/paginas/Login-Sistema/Login-Sistema";
import NavbarRoute from "./NavbarRoute/NavbarRoute";
import PrivateRoute from "./RotaPrivada/RotaPrivata";


export default function Rota() {
    return (
        <>
            <Routes>
                {/* Telas Iniciais */}
                <Route path="/teste" element={<Teste />} />
                <Route path="/" element={<LoginSistema />} />
                <Route path="/*" element={<LoginSistema />} />

                <>
                    {/* Menus */}
                    <Route path="/menu" element={<PrivateRoute cargo="DEFAULT"><NavbarRoute /></PrivateRoute>} />

                    {/* Sistema */}
                    <Route path="/rpg" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarRoute /></PrivateRoute>} />
                    <Route path="/usuarios" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarRoute /></PrivateRoute>} />
                    <Route path="/forum" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarRoute /></PrivateRoute>} />
                    <Route path="/hallDaFama" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarRoute /></PrivateRoute>} />
                    <Route path="/parcasAwards" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarRoute /></PrivateRoute>} />
                    <Route path="/eventos" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarRoute /></PrivateRoute>} />
                </>

                {/* Site */}
            </Routes>
        </>
    )
}