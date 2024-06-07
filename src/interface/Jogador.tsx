import RPG from "./RPG";
import Sessao from "./Sessao";
import Usuario from "./Usuario";

export default interface Jogador {
    id: number;
    jogador_rpg: RPG;
    jogador_session: Sessao;
    id_usuario: Usuario;
}