import Cargo from "./Cargo.tsx";
import Sessao from "./Sessao.tsx";

export default interface Usuario {
    id?: number,
    nome: string,
    email?: string,
    telefone?: string,
    senha?: string,
    aniversario?: string,
    cargos?: Cargo[],
    

}