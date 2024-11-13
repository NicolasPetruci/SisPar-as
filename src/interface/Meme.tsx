import Usuario from "./Usuario";

export default interface Meme {
    id?: number;

    titulo?: string;

    descricao?: string;

    dataCriacao?: string;

    criador?: Usuario;
} 