import { useEffect, useState, useCallback } from "react";
import { useEventoService } from "../../../../services/hooks/useEventoService";
import Evento from "../../../../interface/Evento";
import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import TabelaRelatorio from "../../../organismos/TabelaRelatorio/TabelaRelatorio";
import ColunaTabela from "../../../../interface/ColunaTabela";
import { imprimeDataInput } from "../../../../services/data";

export default function VisualizarEventos() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [dataInicial, setDataInicial] = useState<string>();
    const [dataFinal, setDataFinal] = useState<string>();
    const eventoService = useEventoService();

    const tableColumns: ColunaTabela[] = [
        { header: "Nº", property: "numero", size: "10px" },
        { header: "Nome", property: "nome", size: "600px" },
        { header: "Local", property: "local", size: "150px" },
        { header: "Tipo", property: "tipo_evento", size: "75px" },
        { header: "Data", property: "data", size: "75px" },
        { header: "Presencial?", property: "presencial", size: "25px" },
        { header: "Nº de Inscritos", property: "numero_inscritos", size: "25px" },
    ];

    const buscarEventos = useCallback((dataInicial: string, dataFinal: string) => {
        eventoService
            .visualizarEventos(dataInicial, dataFinal)
            .then((evento: Evento[]) => {
                setEventos(evento);
            })
            .catch((error) => alert(error.message));
    }, [dataInicial, dataFinal, eventoService]);

    const onDataInicialChanged = (e: any) => {
        const dataConvertida: string = imprimeDataInput(e.target.value);
        setDataInicial(dataConvertida);
        buscarEventos(dataConvertida, dataFinal || imprimeDataInput(new Date().toJSON()))
    };

    const onDataFinalChanged = (e: any) => {
        const dataConvertida = imprimeDataInput(e.target.value);
        setDataFinal(dataConvertida);
        buscarEventos(dataInicial || imprimeDataInput(new Date().toJSON()), dataConvertida);
    };

    return (
        <Grid w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap="50px">
            <GridItem colSpan={1} paddingX="10" paddingTop="5">
                <FormLabel>Data Inicial:</FormLabel>
                <Input
                    name="dataInicial"
                    type="datetime-local"
                    defaultValue={dataInicial ? imprimeDataInput(dataInicial) : imprimeDataInput(new Date().toJSON())}
                    onChange={onDataInicialChanged}
                />
                <FormLabel paddingTop="5">Data Final:</FormLabel>
                <Input
                    name="dataFinal"
                    type="datetime-local"
                    defaultValue={dataFinal ? imprimeDataInput(dataFinal) : imprimeDataInput(new Date().toJSON())}
                    onChange={onDataFinalChanged}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <TabelaRelatorio<Evento> columns={tableColumns} items={eventos} />
            </GridItem>
        </Grid>
    );
}
