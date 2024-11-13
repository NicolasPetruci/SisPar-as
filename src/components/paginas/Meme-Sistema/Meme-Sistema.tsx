import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer, Link } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Meme from "../../../interface/Meme";
import { useEffect, useState } from "react";
import { useMemeService } from "../../../services/hooks/useMemeService";
import DrawerAtualizarMeme from "../../organismos/DrawerAtualizarMeme/DrawerAtualizarMeme";
import DrawerCadastroMeme from "../../organismos/DrawerCadastroMeme/DrawerCadastroMeme";
import Botao from "../../atomos/Botao/Botao";
import { Link as LinkRouter } from 'react-router-dom';



export default function MemesSistema() {

    //declarações

    const [meme, setMeme] = useState<Meme[]>([]);
    const [memeSelecionado, setMemeSelecionado] = useState<Meme | null>(null);
    const memeService = useMemeService();

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerCadastroOpen, onOpen: onDrawerCadastroOpen, onClose: onDrawerCadastroClose } = useDisclosure();

    //busca
    const buscarMeme = () => {
        try {
            memeService.getAllMeme().then((meme) => setMeme(meme));
        } catch (error) {
            alert("Erro ao obter memes");

        }
    }
    useEffect(() => {
        buscarMeme();

    }, [])

    //deleta
    const deletarMeme = async (idMeme: string) => {
        memeService.deleteMeme(parseInt(idMeme));
        buscarMeme();


    };

    //atualiza
    const atualizarMeme = (memeAtualizado: Meme) => {
        setMeme((memePrevias) => {
            const memesAtualizados = memePrevias.map((meme) => {
                if (meme.id === memeAtualizado.id) {
                    return memeAtualizado;
                }
                return meme;
            });
            return memesAtualizados;
        });
    };

    const abrirDrawerAtualizar = (meme: Meme) => {
        setMemeSelecionado(meme);
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
                                    MEMES
                                </Text>
                                <Text textAlign="justify">Um CRUD de memes é uma aplicação essencial para organizar e controlar memes de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar memes de maneira intuitiva e eficaz.</Text>
                            </Flex>
                            <Flex>
                                <Botao corTexto="white" classe="preto-lilas" aoClicar={abrirDrawerCadastro}> Cadastro </Botao>
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
                                            <Th>TITULO</Th>
                                            <Th>DESCRICAO</Th>
                                            <Th>AUTOR</Th>
                                            <Th>CRIADO EM</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {meme.map((meme, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{meme.id}</Td>
                                                <Td whiteSpace={'wrap'}>{meme.titulo}</Td>
                                                <Td whiteSpace={'wrap'}>{meme.descricao}</Td>
                                                <Td whiteSpace={'wrap'}>{meme.criador?.nome}</Td>
                                                <Td whiteSpace={'wrap'}>{meme.dataCriacao}</Td>
                                                <Td>
                                                    <Flex>
                                                        <Button className="amarelo-rejeita" onClick={() => deletarMeme(meme.id!.toString())}> D</Button>
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawerAtualizar(meme)}> V </Button>

                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>TITULO</Th>
                                            <Th>DESCRICAO</Th>
                                            <Th>AUTOR</Th>
                                            <Th>CRIADO EM</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Drawer
                                    size="lg"
                                    isOpen={isDrawerAtualizarOpen}
                                    placement="right"
                                    onClose={onDrawerAtualizarClose}
                                >
                                    {memeSelecionado && (
                                        <DrawerAtualizarMeme
                                            isOpen={isDrawerAtualizarOpen}
                                            memeInterface={memeSelecionado}
                                            onClose={onDrawerAtualizarClose}
                                            onUpdate={atualizarMeme}
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
                                        <DrawerCadastroMeme
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


