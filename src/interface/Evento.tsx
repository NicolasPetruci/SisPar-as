import TipoEvento from "./TipoEvento";
import Usuario from "./Usuario";


export default interface Evento {
    id?: number;
    nome: string;
    descricao: string;
    local: string;
    online: string;
    data_hora: string | undefined;
    tipo_evento: TipoEvento;
    id_tipo_evento: number;
    participantes: Usuario[];


}