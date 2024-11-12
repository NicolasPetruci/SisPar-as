import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer, Link } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Evento from "../../../interface/Evento";
import { useEffect, useState } from "react";
import { useEventoService } from "../../../services/hooks/useEventoService";
import DrawerAtualizarEvento from "../../organismos/DrawerAtualizarEvento/DrawerAtualizarEvento";
import DrawerCadastroEvento from "../../organismos/DrawerCadastroEvento/DrawerCadastroEvento";
import Botao from "../../atomos/Botao/Botao";
import { Link as LinkRouter } from 'react-router-dom';



export default function CinemaSistema() {

    //declarações

    const [cinema, setEvento] = useState<Evento[]>([]);
    const [cinemaSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
    const cinemaService = useEventoService();

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerCadastroOpen, onOpen: onDrawerCadastroOpen, onClose: onDrawerCadastroClose } = useDisclosure();

    //busca
    const buscarEvento = () => {
        try {
            cinemaService.getAllEvento().then((cinema) => setEvento(cinema));
        } catch (error) {
            alert("Erro ao obter cinemas");

        }
    }
    useEffect(() => {
        buscarEvento();

    }, [])

    //deleta
    const deletarEvento = async (idEvento: string) => {
        cinemaService.deleteEvento(idEvento);
        buscarEvento();


    };

    //atualiza
    const atualizarEvento = (cinemaAtualizado: Evento) => {
        setEvento((cinemaPrevias) => {
            const cinemasAtualizados = cinemaPrevias.map((cinema) => {
                if (cinema.id === cinemaAtualizado.id) {
                    return cinemaAtualizado;
                }
                return cinema;
            });
            return cinemasAtualizados;
        });
    };

    const abrirDrawerAtualizar = (cinema: Evento) => {
        setEventoSelecionado(cinema);
        onDrawerAtualizarOpen();
    };

    const abrirDrawerCadastro = () => {
        onDrawerCadastroOpen();
    };

    return (
        <>

            <Grid w='100%' h='0px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(1, 1fr)'
                gap='50px'
            >

                <GridItem colSpan={4}>
                    <CaixaPadronizada alturaCaixa='25vh' justificarComponente='center' alinharItem='center'>
                        <>
                            <Flex h='100%' flexDir={'column'} justifyContent='start' alignItems='start'>
                                <Text textAlign='left' fontSize={22} fontWeight={900}>
                                    EVENTOS
                                </Text>
                                <Text textAlign="justify">Um CRUD de cinemas é uma aplicação essencial para organizar e controlar cinemas de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar cinemas de maneira intuitiva e eficaz.</Text>
                            </Flex>
                            <Flex>
                                <Botao corTexto="white" classe="preto-lilas" aoClicar={abrirDrawerCadastro}> Cadastro </Botao>

                                <Botao classe="preto-lilas" href="/cinemas/visualizar" target="_blank"> Relatório Cinema </Botao>
                            </Flex>


                        </>
                    </CaixaPadronizada>
                </GridItem>
                <GridItem w='100%' h='100%' colSpan={4} p='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <>
                            <TableContainer>
                                <Table variant='striped' colorScheme='purple'>

                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>NOME</Th>
                                            <Th>LOCAL</Th>
                                            <Th>AÇÃO</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {cinema.map((cinema, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{cinema.id}</Td>
                                                <Td whiteSpace={'wrap'}>{cinema.nome}</Td>
                                                <Td whiteSpace={'wrap'}>{cinema.local}</Td>
                                                <Td>
                                                    <Flex>
                                                        <Button className="amarelo-rejeita" onClick={() => deletarEvento(cinema.id!.toString())}> D</Button>
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawerAtualizar(cinema)}> V </Button>
                                                        <Link
                                                            as={LinkRouter}
                                                            to={'listar_participantes'}
                                                            _hover={{ textDecoration: 'none' }}
                                                            target="_blank"
                                                            state={{ idEvento: cinema.id }}>
                                                            <Button className="roxo-aceita"> Presença </Button>
                                                        </Link>
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
                                    isOpen={isDrawerAtualizarOpen}
                                    placement="right"
                                    onClose={onDrawerAtualizarClose}
                                >
                                    {cinemaSelecionado && (
                                        <DrawerAtualizarCinema
                                            isOpen={isDrawerAtualizarOpen}
                                            cinemaInterface={cinemaSelecionado}
                                            onClose={onDrawerAtualizarClose}
                                            onUpdate={atualizarEvento}
                                        />
                                    )}
                                </Drawer>

                                <Drawer
                                    size="lg"
                                    isOpen={isDrawerCadastroOpen}
                                    placement="right"
                                    onClose={onDrawerCadastroClose}
                                >
                                    {(
                                        <DrawerCadastroCinema
                                            isOpen={isDrawerCadastroOpen}
                                            onClose={onDrawerCadastroClose}
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


