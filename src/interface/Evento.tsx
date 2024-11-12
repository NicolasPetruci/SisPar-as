import TipoEvento from "./TipoEvento";
import Usuario from "./Usuario";


export default interface Evento {
    id?: number;
    nome: string;
    descricao?: string;
    local: string;
    online: boolean;
    dataHora: string | undefined;
    tipo: TipoEvento;
    idTipoEvento?: number;
    participantes: Usuario[];


}