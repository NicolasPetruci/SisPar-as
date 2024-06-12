import RPG from "./RPG";
import Usuario from "./Usuario";

export default interface Sessao {

    id?: number;
    nome: string;
    descricao: string;
    data_hora: string;
    temporada: number;
    numero: number;
    rpg: RPG;
    jogadores: Usuario[];

}