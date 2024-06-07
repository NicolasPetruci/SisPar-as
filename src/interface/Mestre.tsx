import Usuario from "./Usuario";

export default interface Mestre {
    id: number;
    ativo: boolean;
    id_usuario: Usuario;
}