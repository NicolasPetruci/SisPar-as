import Cargo from "./Cargo.tsx";

export default interface Usuario {
    id: number,
    nome: string,
    email?: string,
    telefone: string,
    senha?: string,
    aniversario?: string,
    cargo?: Cargo,

}