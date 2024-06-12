import RPG from "./RPG";

export default interface Sessao {

    id: number;
    nome: string;
    descricao: string;
    data_hora: string;
    temporada: number;
    numero: number;
    rpg: RPG;

}