import { Route, Routes } from "react-router-dom";
import Teste from "../components/paginas/Teste/Teste";
import LoginSistema from "../components/paginas/Login-Sistema/Login-Sistema";
import MenuSistema from "../components/paginas/Menu-Sistema/Menu-Sistema";
import RPGSistema from "../components/paginas/RPG-Sistema/RPG-Sistema";
import UsuariosSistema from "../components/paginas/Usuarios-Sistema/Usuarios-Sistema";
import ForumSistema from "../components/paginas/Forum-Sistema/Forum-Sistema";
import HallDaFamaSistema from "../components/paginas/HallDaFama-Sistema/HallDaFama-Sistema";
import ParcasAwardsSistema from "../components/paginas/ParcasAwards-Sistema/ParcasAwards-Sistema";
import EventosSistema from "../components/paginas/Eventos-Sistema/Eventos-Sistema";
import PrivateRoute from "./RotaPrivata";


export default function Rota() {
    return (
        <>
            <Routes>
                {/* Telas Iniciais */}
                <Route path="/teste" element={<Teste />} />
                <Route path="/" element={<LoginSistema />} />

                {/* Menus */}
                <Route path="/menu" element={<MenuSistema />} />

                {/* Sistema */}
                <Route path="/rpg" element={<PrivateRoute cargo=""><RPGSistema /></PrivateRoute>} />
                <Route path="/usuarios" element={<PrivateRoute><UsuariosSistema /></PrivateRoute>} />
                <Route path="/forum" element={<ForumSistema />} />
                <Route path="/hallDaFama" element={<HallDaFamaSistema />} />
                <Route path="/parcasAwards" element={<ParcasAwardsSistema />} />
                <Route path="/eventos" element={<EventosSistema />} />

                {/* Site */}
            </Routes>
        </>
    )
}