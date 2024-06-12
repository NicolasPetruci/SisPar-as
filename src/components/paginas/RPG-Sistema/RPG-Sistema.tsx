import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import RPG from "../../../interface/RPG";
import { useEffect, useState } from "react";
import { useRPGService } from "../../../services/hooks/useRPGService";
import DrawerAtualizarRPG from "../../organismos/DrawerAtualizarRPG/DrawerAtualizarRPG";
import DrawerCadastroRPG from "../../organismos/DrawerCadastroRPG/DrawerCadastroRPG";



export default function RPGsSistema() {

    //declarações

    const [rpg, setRPG] = useState<RPG[]>([]);
    const [rpgSelecionado, setRPGSelecionado] = useState<RPG | null>(null);
    const rpgService = useRPGService();

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerCadastroOpen, onOpen: onDrawerCadastroOpen, onClose: onDrawerCadastroClose } = useDisclosure();

    //busca
    const buscarRPG = () => {
        try {
            rpgService.getAllRPG().then((rpg) => setRPG(rpg));
        } catch (error) {
            alert("Erro ao obter rpgs");

        }
    }
    useEffect(() => {
        buscarRPG();

    }, [])

    //deleta
    const deletarRPG = async (idRPG: number) => {
        rpgService.deleteRPG(idRPG);
        buscarRPG();


    };

    //atualiza
    const atualizarRPG = (rpgAtualizado: RPG) => {
        setRPG((rpgPrevias) => {
            const rpgsAtualizados = rpgPrevias.map((rpg) => {
                if (rpg.id === rpgAtualizado.id) {
                    return rpgAtualizado;
                }
                return rpg;
            });
            return rpgsAtualizados;
        });
    };

    const abrirDrawerAtualizar = (rpg: RPG) => {
        setRPGSelecionado(rpg);
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
                                    RPGs
                                </Text>
                                <Text textAlign="justify">Um CRUD de rpgs é uma aplicação essencial para organizar e controlar rpgs de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar rpgs de maneira intuitiva e eficaz.</Text>
                            </Flex>

                            <Button className="preto-lilas" onClick={abrirDrawerCadastro}> Cadastro </Button>



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
                                            <Th>MESTRE</Th>
                                            <Th>AÇÃO</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {rpg.map((rpg, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{rpg.id}</Td>
                                                <Td whiteSpace={'wrap'}>{rpg.nome}</Td>
                                                <Td whiteSpace={'wrap'}>{rpg.mestre?.nome}</Td>
                                                <Td>
                                                    <Flex>
                                                        <Button className="amarelo-rejeita" onClick={() => deletarRPG(rpg.id ? rpg.id : 0)}> D</Button>
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawerAtualizar(rpg)}> V </Button>
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
                                    {rpgSelecionado && (
                                        <DrawerAtualizarRPG
                                            isOpen={isDrawerAtualizarOpen}
                                            rpgInterface={rpgSelecionado}
                                            onClose={onDrawerAtualizarClose}
                                            onUpdate={atualizarRPG}
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
                                        <DrawerCadastroRPG
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


