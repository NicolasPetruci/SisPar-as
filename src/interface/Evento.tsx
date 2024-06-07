import TipoEvento from "./TipoEvento";

export default interface Evento {
    id: number;
    nome: string;
    descricao: string;
    local: string;
    data_hora: string;
    id_tipo_evento: TipoEvento;
}