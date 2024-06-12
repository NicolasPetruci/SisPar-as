import { Route, Routes, useLocation } from "react-router-dom";
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
import RPGSGeraisSistema from "../components/paginas/RPGSGerais-Sistema/RPGSGerais-Sistema";
import SessoesRPGSistema from "../components/paginas/SessoesRPG-Sistema/SessoesRPG-Sistema";
import VisualizarEventos from "../components/paginas/Relatorios/Visualizar-Eventos/Visualizar-Eventos";
import ListarParticipantesEvento from "../components/paginas/Relatorios/Listar-Participantes-Evento/Listar-Participantes-Evento";


export default function Rota() {
    const location = useLocation()
    return (
        <>
            <Routes location={location} key={location.key}>
                {/* Telas Iniciais */}
                <Route path="/teste" element={<Teste />} />
                <Route path="/" element={<LoginSistema />} />
                <Route path="/*" element={<LoginSistema />} />

                <>
                    {/* Menus */}
                    <Route path="/menu" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><MenuSistema /></NavbarSistema></PrivateRoute>} />

                    {/* Sistema */}
                    <Route path="/meusrpgs" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><RPGSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/rpgsgerais" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><RPGSGeraisSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/sessoesrpg" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><SessoesRPGSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/usuarios" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><UsuariosSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/forum" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><ForumSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/hallDaFama" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><HallDaFamaSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/parcasAwards" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><ParcasAwardsSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/eventos" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><NavbarSistema><EventosSistema /></NavbarSistema></PrivateRoute>} />
                    <Route path="/eventos/visualizar" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><VisualizarEventos /></PrivateRoute>} />
                    <Route path="/eventos/listar_participantes" element={<PrivateRoute cargo="DEFAULT,ADM,DONO,MESTRE"><ListarParticipantesEvento /></PrivateRoute>} />

                </>

                {/* Site */}
            </Routes>
        </>
    )
}