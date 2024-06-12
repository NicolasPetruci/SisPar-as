import RPG from "./RPG";
import Sessao from "./Sessao";
import Usuario from "./Usuario";

export default interface Jogador {
    id: number;
    rpg: RPG;
    session: Sessao;
    usuario: Usuario;
}