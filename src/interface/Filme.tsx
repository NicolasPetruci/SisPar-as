import GeneroFilme from "./GeneroFilme";

export default interface Filme {
    id: number;
    nome: string;
    generos?: GeneroFilme[];
}