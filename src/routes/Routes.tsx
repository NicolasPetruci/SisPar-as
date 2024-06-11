import { Route, Routes } from "react-router-dom";
import Teste from "../components/paginas/Teste/Teste";
import LoginSistema from "../components/paginas/Login-Sistema/Login-Sistema";

import PrivateRoute from "./RotaPrivada/RotaPrivata";
import RPGSistema from "../components/paginas/RPG-Sistema/RPG-Sistema";
import NavbarSistema from "../components/organismos/NavbarSistema/NavbarSistema";
import MenuSistema from "../components/paginas/Menu-Sistema/Menu-Sistema";
import UsuariosSistema from "../components/paginas/Usuarios-Sistema/Usuarios-Sistema";
import ForumSistema from "../components/paginas/Forum-Sistema/Forum-Sistema";
import HallDaFamaSistema from "../components/paginas/HallDaFama-Sistema/HallDaFama-Sistema";
import ParcasAwardsSistema from "../components/paginas/ParcasAwards-Sistema/ParcasAwards-Sistema";
import EventosSistema from "../components/paginas/Eventos-Sistema/Eventos-Sistema";


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
                    <Route path="/menu" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><MenuSistema /></NavbarSistema></PrivateRoute>} />

                    {/* Sistema */}
                    <Route path="/rpg" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><RPGSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/usuarios" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><UsuariosSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/forum" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><ForumSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/hallDaFama" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><HallDaFamaSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/parcasAwards" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><ParcasAwardsSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/eventos" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><EventosSistema /></NavbarSistema></PrivateRoute>} />
                </>

                {/* Site */}
            </Routes>
        </>
    )
}