import { useEffect, useState } from "react";
import { useEventoService } from "../../../services/hooks/useEventoService";
import Evento from "../../../interface/Evento";
import { Button, Drawer, Flex, Grid, GridItem, Input, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import { imprimeDataInput } from "../../../services/data";
interface DataSelecionada {
    dataInicial: Date;
    dataFinal: Date;
}

export default function VisualizarEventos(){

    const [eventos, setEventos] = useState<Evento[]>([])
    const [dataInicial, setDataInicial] = useState(new Date())
    const [dataFinal, setDataFinal] = useState(new Date())

    const eventoService = useEventoService();
    const tableColumns = [
        {header: "Número", property: "numero"},
        {header: "Nome", property: "nome"},
        {header: "Local", property: "local"},
        {header: "Tipo do Evento", property: "tipo_evento"},
        {header: "Data e Hora", property: "data"},
        {header: "Presencial?", property: "presencial"},
        {header: "Nº de Inscritos", property: "numero_inscritos"},
    ]
    //busca
    const dataSelecionada = () =>{
        return (dataInicial && dataFinal);
    }
    const buscarEvento = () => {
        try {
            if(dataSelecionada()){
                eventoService.visualizarEventos().then((evento) => setEventos(evento));
            }
        } catch (error) {
            alert("Erro ao obter eventos");

        }
    }
    useEffect(() => {
        buscarEvento();
    }, [])

    let tabela = (<Grid w='100%' h='0px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(1, 1fr)'
                gap='50px'
            >
                <GridItem w='100%' h='100%' colSpan={4} p='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <Text>
                            Selecione uma data inicial e final.
                        </Text>
                    </CaixaPadronizada>
                </GridItem>
            </Grid >);
    if(eventos){
        tabela = (<Grid w='100%' h='0px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(1, 1fr)'
                gap='50px'
            >
                <GridItem w='100%' h='100%' colSpan={4} p='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <>
                            <TableContainer>
                                <Table variant='striped' colorScheme='purple'>

                                    <Thead>
                                        <Tr>
                                            {
                                                tableColumns.map(
                                                    (column)=>{
                                                        return (
                                                            <Th>
                                                                {column.header}
                                                            </Th>
                                                        );
                                                    }
                                                )
                                            }
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {eventos.map((evento, index) => (
                                            <Tr key={index}>
                                                {
                                                    tableColumns.map(
                                                        (column) => {
                                                            return (
                                                                <Td whiteSpace={'wrap'}>
                                                                    {(evento as any)[column.property]}
                                                                </Td>
                                                            )
                                                        }
                                                    )
                                                }
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot>
                                       <Tr>
                                            {
                                                tableColumns.map(
                                                    (column)=>{
                                                        return (
                                                            <Th>
                                                                {column.header}
                                                            </Th>
                                                        );
                                                    }
                                                )
                                            }
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </>
                    </CaixaPadronizada>
                </GridItem>
            </Grid >)
    }

     return (
        <>
            <Input name="dataInicial" type='datetime-local' defaultValue={imprimeDataInput(dataInicial)} onChange={cadastroTempoEvento} />
        </>
    )

}