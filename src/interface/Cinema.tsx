import Filme from "./Filme";

export default interface Cinema {
    id?: number;
    nome: string;
    filmeSorteio?: Filme[];
    dataHora: string | undefined;
    filmeSelecionado?: Filme;
}