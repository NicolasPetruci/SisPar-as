import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer, Link } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Filme from "../../../interface/Filme";
import { useEffect, useState } from "react";
import { useFilmeService } from "../../../services/hooks/useFilmeService";
import DrawerCadastroFilme from "../../organismos/DrawerCadastroFilme/DrawerCadastroFilme";
import DrawerCadastroFilme from "../../organismos/DrawerCadastroFilme/DrawerCadastroFilme";
import Botao from "../../atomos/Botao/Botao";




export default function FilmeSistema() {

    //declarações

    const [filme, setFilme] = useState<Filme[]>([]);
    const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);
    const filmeService = useFilmeService();

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerCadastroOpen, onOpen: onDrawerCadastroOpen, onClose: onDrawerCadastroClose } = useDisclosure();

    //busca
    const buscarFilme = () => {
        try {
            filmeService.getAllFilme().then((filme) => setFilme(filme));
        } catch (error) {
            alert("Erro ao obter filmes");

        }
    }
    useEffect(() => {
        buscarFilme();

    }, [])

    //deleta
    const deletarFilme = async (idFilme: string) => {
        filmeService.deleteFilme(idFilme);
        buscarFilme();


    };

    //atualiza
    const atualizarFilme = (filmeAtualizado: Filme) => {
        setFilme((filmePrevias) => {
            const filmesAtualizados = filmePrevias.map((filme) => {
                if (filme.id === filmeAtualizado.id) {
                    return filmeAtualizado;
                }
                return filme;
            });
            return filmesAtualizados;
        });
    };

    const abrirDrawerAtualizar = (filme: Filme) => {
        setFilmeSelecionado(filme);
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
                                <Text textAlign="justify">Um CRUD de filmes é uma aplicação essencial para organizar e controlar filmes de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar filmes de maneira intuitiva e eficaz.</Text>
                            </Flex>
                            <Flex>
                                <Botao corTexto="white" classe="preto-lilas" aoClicar={abrirDrawerCadastro}> Cadastro </Botao>

                                <Botao classe="preto-lilas" href="/filmes/visualizar" target="_blank"> Relatório Filme </Botao>
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
                                          
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {filme.map((filme, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{filme.id}</Td>
                                                <Td whiteSpace={'wrap'}>{filme.nome}</Td>
                                                
                                                <Td>
                                                    <Flex>
                                                        <Button className="amarelo-rejeita" onClick={() => deletarFilme(filme.id!.toString())}> D</Button>
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawerAtualizar(filme)}> V </Button>

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
                                            

                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Drawer
                                    size="lg"
                                    isOpen={isDrawerAtualizarOpen}
                                    placement="right"
                                    onClose={onDrawerAtualizarClose}
                                >
                                    {filmeSelecionado && (
                                        <DrawerAtualizarFilme
                                            isOpen={isDrawerAtualizarOpen}
                                            filmeInterface={filmeSelecionado}
                                            onClose={onDrawerAtualizarClose}
                                            onUpdate={atualizarFilme}
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
                                        <DrawerCadastroFilme
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


