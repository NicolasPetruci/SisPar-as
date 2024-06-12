import GeneroRPG from './GeneroRPG';
import Mestre from './Mestre.tsx';
import Usuario from './Usuario.tsx'

export default interface RPG {
    id?: number;
    nome?: string;
    descricao?: string;
    mestre?: Mestre;
    jogadores?: Usuario[];
    generos?: GeneroRPG[];
}