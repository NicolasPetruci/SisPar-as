import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Evento from "../../../interface/Evento";
import { useEffect, useState } from "react";
import { useEventoService } from "../../../services/hooks/useEventoService";
import React from "react";



export default function EventosSistema() {

    const [evento, setEvento] = useState<Evento[]>([]);
    const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

    const [busca, setBusca] = React.useState("");


    const eventoService = useEventoService();

    //busca

    useEffect(() => {
        async function buscarEvento() {
            try {
                await eventoService.getAllEvento().then((evento) => setEvento(evento));
            } catch (error) {
                alert("Erro ao obter eventos");
                toast({
                    title: `Erro ao obter eventos ${error}`,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
        buscarEvento();
    }, [eventoService, toast])

    return (
        <>

            <Grid w='100%' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(1, 1fr)'

            >
                <GridItem colSpan={4}>
                    <CaixaPadronizada justificarComponente='start' alinharItem='top'>
                        <>
                            <Flex h='100%' flexDir={'column'} gap='10px' justifyContent='start' alignItems='start'>
                                <Text textAlign='left' fontSize={22} fontWeight={900}>
                                    EVENTOS
                                </Text>
                                <Text textAlign="justify">Um CRUD de eventos é uma aplicação essencial para organizar e controlar eventos de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar eventos de maneira intuitiva e eficaz.</Text>
                            </Flex>
                        </>
                    </CaixaPadronizada>

                </GridItem>

                <GridItem colSpan={4}>
                    <CaixaPadronizada>
                        <>
                            <TableContainer>
                                <TableContainer>
                                    <Table variant='striped' colorScheme='teal'>

                                        <Thead>
                                            <Tr>
                                                <Th>Nome</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {evento.map((evento, index) => (
                                                <Tr key={index}>
                                                    <Td>{evento.id}</Td>
                                                    <Td>{evento.nome}</Td>
                                                </Tr>
                                            ))}

                                        </Tbody>
                                        <Tfoot>
                                            <Tr>
                                                <Th>Nome</Th>
                                            </Tr>
                                        </Tfoot>
                                    </Table>
                                </TableContainer>
                            </TableContainer>
                        </>
                    </CaixaPadronizada>

                </GridItem>



            </Grid >

        </>
    )
}

function toast(arg0: { title: string; status: string; duration: number; isClosable: boolean; }) {
    throw new Error("Function not implemented.");
}
