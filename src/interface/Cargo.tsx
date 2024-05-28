import Usuario from "./Usuario.tsx"

export default interface Cargo {
    id: number,
    descricao: string,
    usuario: Usuario,
}