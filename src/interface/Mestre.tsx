import Usuario from "./Usuario";

export default interface Mestre {
    id: number;
    ativo: boolean;
    usuario: Usuario;
}