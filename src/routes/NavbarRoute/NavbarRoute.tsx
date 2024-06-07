import { Route, Routes } from "react-router-dom";
import NavbarSistema from "../../components/organismos/NavbarSistema/NavbarSistema";
import PrivateRoute from "../RotaPrivada/RotaPrivata";
import EventosSistema from "../../components/paginas/Eventos-Sistema/Eventos-Sistema";
import ForumSistema from "../../components/paginas/Forum-Sistema/Forum-Sistema";
import HallDaFamaSistema from "../../components/paginas/HallDaFama-Sistema/HallDaFama-Sistema";
import MenuSistema from "../../components/paginas/Menu-Sistema/Menu-Sistema";
import ParcasAwardsSistema from "../../components/paginas/ParcasAwards-Sistema/ParcasAwards-Sistema";
import RPGSistema from "../../components/paginas/RPG-Sistema/RPG-Sistema";
import UsuariosSistema from "../../components/paginas/Usuarios-Sistema/Usuarios-Sistema";

export default function NavbarRoute() {

    return (
        <NavbarSistema>
            <>
                <Routes>
                    {/* Menus */}
                    <Route path="/menu" element={<MenuSistema />} />

                    {/* Sistema */}
                    <Route path="/rpg" element={<RPGSistema />} />
                    <Route path="/usuarios" element={<UsuariosSistema />} />
                    <Route path="/forum" element={<ForumSistema />} />
                    <Route path="/hallDaFama" element={<HallDaFamaSistema />} />
                    <Route path="/parcasAwards" element={<ParcasAwardsSistema />} />
                    <Route path="/eventos" element={<EventosSistema />} />
                </Routes>
            </>
        </NavbarSistema>
    )
}