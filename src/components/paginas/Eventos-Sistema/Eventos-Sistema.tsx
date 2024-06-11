import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Evento from "../../../interface/Evento";
import { useEffect, useState } from "react";
import { useEventoService } from "../../../services/hooks/useEventoService";
import React from "react";
import BotaoGradiente from "../../moleculas/BotaoGradiente/BotaoGradiente";
import DrawerCadastroEvento from "../../organismos/DrawerCadastroEvento/DrawerCadastroEvento";



export default function EventosSistema() {

    //declarações
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [evento, setEvento] = useState<Evento[]>([]);
    const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
    const btnRef = React.useRef()
    const eventoService = useEventoService();

    //busca
    const buscarEvento = () => {
        try {
            eventoService.getAllEvento().then((evento) => setEvento(evento));
        } catch (error) {
            alert("Erro ao obter eventos");

        }
    }
    useEffect(() => {
        buscarEvento();
    }, [])

    //deleta
    const deletarEvento = async (idEvento: string) => {
        eventoService.deleteEvento(idEvento);
        buscarEvento();

    };

    //atualiza
    const atualizarEvento = (eventoAtualizado: Evento) => {
        setEvento((eventoPrevias) => {
            const eventosAtualizados = eventoPrevias.map((evento) => {
                if (evento.id === eventoAtualizado.id) {
                    return eventoAtualizado;
                }
                return evento;
            });
            return eventosAtualizados;
        });
    };

    //abrirDrawer
    const abrirDrawer = (evento: Evento) => {
        setEventoSelecionado(evento);
        onOpen();
    };

    return (
        <>

            <Grid w='100%' h='0px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(1, 1fr)'
                gap='50px'

            >
                <GridItem colSpan={4}>
                    <CaixaPadronizada alturaCaixa='25vh' justificarComponente='start' alinharItem='top'>
                        <>
                            <Flex h='100%' flexDir={'column'} justifyContent='start' alignItems='start'>
                                <Text textAlign='left' fontSize={22} fontWeight={900}>
                                    EVENTOS
                                </Text>
                                <Text textAlign="justify">Um CRUD de eventos é uma aplicação essencial para organizar e controlar eventos de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar eventos de maneira intuitiva e eficaz.</Text>
                            </Flex>
                        </>
                    </CaixaPadronizada>

                </GridItem>

                <GridItem w='100%' h='100%' colSpan={4} p='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <>

                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>

                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>NOME</Th>
                                            <Th>LOCAL</Th>
                                            <Th>AÇÃO</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {evento.map((evento, index) => (
                                            <Tr key={index}>
                                                <Td>{evento.id}</Td>
                                                <Td>{evento.nome}</Td>
                                                <Td>{evento.local}</Td>
                                                <Td>
                                                    <Flex>
                                                        <Button className="amarelo-rejeita" onClick={() => deletarEvento(evento.id!.toString())}> D</Button>
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawer(evento)}> V </Button>
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}

                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>NOME</Th>
                                            <Th>LOCAL</Th>
                                            <Th>AÇÃO</Th>

                                        </Tr>
                                    </Tfoot>
                                </Table>

                                <Drawer
                                    size="lg"
                                    isOpen={isOpen}
                                    placement="right"
                                    onClose={onClose}
                                >
                                    {eventoSelecionado && (
                                        <DrawerCadastroEvento
                                            isOpen={isOpen}
                                            eventoInterface={eventoSelecionado}
                                            onClose={onClose}
                                            onUpdate={atualizarEvento}
                                        />
                                    )}
                                </Drawer>
                            </TableContainer>

                        </>
                    </CaixaPadronizada>

                </GridItem>



            </Grid >

        </>
    )
}


