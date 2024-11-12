import Filme from "./Filme";

export default interface Cinema {
    id?: number;
    filmeSorteio: Filme[];
    data_hora: string | undefined;
    filmeSelecionado: Filme;
}