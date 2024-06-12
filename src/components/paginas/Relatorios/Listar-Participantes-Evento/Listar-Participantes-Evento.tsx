import { useEffect, useState, useCallback } from "react";
import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import TabelaRelatorio from "../../../organismos/TabelaRelatorio/TabelaRelatorio";
import ColunaTabela from "../../../../interface/ColunaTabela";
import { imprimeDataInput } from "../../../../services/data";
import Usuario from "../../../../interface/Usuario";
import { useEventoService } from "../../../../services/hooks/useEventoService";
import { useLocation } from "react-router-dom";

export default function ListarParticipantesEvento() {
    const location = useLocation();
    console.log(location)
    const {idEvento} = location.state || {};
    const [participantes, setParticipantes] = useState<Usuario[]>([]);
    const eventoService = useEventoService();

    const tableColumns: ColunaTabela[] = [
        { header: "Nº", property: "numero", size: "10px" },
        { header: "Nome", property: "nome", size: "600px" },
        { header: "Telefone", property: "telefone", size: "150px" },
        { header: "Assinatura", property: "tipo_participante", size: "75px" },
    ];

    const buscarParticipantes = useCallback(() => {
        eventoService
            .listarParticipantesEvento(idEvento)
            .then((participantes: Usuario[]) => {
                setParticipantes(participantes);
            })
    }, [eventoService]);

    return (
        <Grid w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap="50px">
            <GridItem colSpan={2}>
                <TabelaRelatorio<Usuario> columns={tableColumns} items={participantes} />
            </GridItem>
        </Grid>
    );
}
