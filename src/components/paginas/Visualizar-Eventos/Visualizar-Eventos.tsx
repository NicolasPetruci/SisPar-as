import { useEffect, useState } from "react";
import { useEventoService } from "../../../services/hooks/useEventoService";
import Evento from "../../../interface/Evento";
import { FormLabel, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import { imprimeDataInput } from "../../../services/data";
import TabelaRelatorio from "../../organismos/TabelaRelatorio/TabelaRelatorio";
import ColunaTabela from "../../../interface/ColunaTabela";

export default function VisualizarEventos(){

    const [eventos, setEventos] = useState<Evento[]>([])
    const [dataInicial, setDataInicial] = useState<string>();
    const [dataFinal, setDataFinal] = useState<string>();

    const eventoService = useEventoService();
    const tableColumns: ColunaTabela[] = [
        {header: "Nº", property: "numero", size: "10px"},
        {header: "Nome", property: "nome", size: "600px"},
        {header: "Local", property: "local", size: "150px"},
        {header: "Tipo", property: "tipo_evento", size: "75px"},
        {header: "Data", property: "data", size: "75px"},
        {header: "Presencial?", property: "presencial", size: "25px"},
        {header: "Nº de Inscritos", property: "numero_inscritos", size: "25px"},
    ]
    //busca
    const [dataSelecionada, setDataSelecionada] = useState(false);
    const onDataInicialChanged = (e: any) => {
        const dataConvertida: string = imprimeDataInput(e.target.value);
        setDataInicial(dataConvertida);
        buscarEventos();
    };
    const onDataFinalChanged = (e: any) => {
        const dataConvertida = imprimeDataInput(e.target.value);
        setDataFinal(dataConvertida);
        buscarEventos();
    };
    
    useEffect(() => {
        setDataSelecionada(!!(dataFinal && dataInicial));
    })
    const buscarEventos = () => {
        try {
            if(dataSelecionada){
                eventoService.visualizarEventos(
                    dataInicial ? dataInicial : "",
                    dataFinal ? dataFinal : ""
                )
                .then((evento: Evento[]) => {
                    setEventos(evento)
                    setTabela(<TabelaRelatorio<Evento> columns={tableColumns} items={evento}></TabelaRelatorio>)
                })
                .catch((error)=> alert(error.message));
            }
        } catch (error) {
            alert("Erro ao obter eventos");
            
        }
    }
    buscarEventos();
    const [tabela, setTabela] = useState(<Grid w='100%' h='0px' templateRows='repeat(1, 1fr)'
    templateColumns='repeat(1, 1fr)'
    gap='50px'
    >
                <GridItem w='100%' h='100%' colSpan={4} paddingX='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <Text>
                            Sem dados para o período selecionado.
                        </Text>
                    </CaixaPadronizada>
                </GridItem>
            </Grid >);


     return (
        <>
            <Grid w='100%' h='0px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(2, 1fr)'
                gap='50px'>
                <GridItem h='100%' colSpan={1} paddingX='10' paddingTop='5'>
                    <FormLabel>
                        Data Inicial:
                    </FormLabel>
                    <Input name="dataInicial" 
                           type='datetime-local'
                           defaultValue={dataInicial ? imprimeDataInput(dataInicial) : imprimeDataInput(new Date().toJSON())} 
                           onChange={onDataInicialChanged} /> 
                    <FormLabel paddingTop='5'>
                        Data Final:
                    </FormLabel>
                    <Input name="dataFinal" 
                           type='datetime-local'
                           defaultValue={dataFinal ? imprimeDataInput(dataFinal) : imprimeDataInput(new Date().toJSON())} 
                           onChange={onDataFinalChanged} />
                </GridItem>
                <GridItem w='100%' h='100%' colSpan={2}>
                    {tabela}  
                </GridItem>
            </Grid>  
        </>
    )

}