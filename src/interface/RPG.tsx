import GeneroRPG from './GeneroRPG';
import Usuario from './Usuario.tsx'

export default interface RPG {
    id?: number;
    nome?: string;
    descricao?: string;
    mestre?: Usuario;
    id_mestre?: number;
    jogadores?: Usuario[];
    generos?: GeneroRPG[];
}