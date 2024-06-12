import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import RPG from "../../../interface/RPG";
import { useEffect, useState } from "react";
import { useRPGService } from "../../../services/hooks/useRPGService";
import DrawerAtualizarRPG from "../../organismos/DrawerAtualizarRPG/DrawerAtualizarRPG";
import DrawerCadastroRPG from "../../organismos/DrawerCadastroRPG/DrawerCadastroRPG";
import { useMestreService } from "../../../services/hooks/useMestreService";
import DrawerInscreverRPG from "../../organismos/DrawerInscreverRPG/DrawerInscreverRPG";
import DrawerVerSessaoRPG from "../../organismos/DrawerVerSessaoRPG/DrawerVerSessaoRPG";




export default function RPGSGeraisSistema() {

    //declarações

    const [rpg, setRPG] = useState<RPG[]>([]);
    const [rpgSelecionado, setRPGSelecionado] = useState<RPG | null>(null);
    const rpgService = useRPGService()

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerVerSessaoOpen, onOpen: onDrawerVerSessaoOpen, onClose: onDrawerVerSessaoClose } = useDisclosure();

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

    const abrirDrawerAtualizar = (rpg: RPG) => {
        setRPGSelecionado(rpg);
        onDrawerAtualizarOpen();
    };

    const abrirDrawerVisualizar = (rpg: RPG) => {
        setRPGSelecionado(rpg);
        onDrawerVerSessaoOpen();
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
                                                <Td whiteSpace={'wrap'}>{rpg.mestre?.usuario.nome}</Td>
                                                <Td>
                                                    <Flex>

                                                        <Button className="lilas-branco" onClick={() => abrirDrawerVisualizar(rpg)}> S </Button>
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
                                        <DrawerInscreverRPG
                                            isOpen={isDrawerAtualizarOpen}
                                            rpgInterface={rpgSelecionado}
                                            onClose={onDrawerAtualizarClose}

                                        />
                                    )}
                                </Drawer>

                            </TableContainer>

                        </>
                    </CaixaPadronizada>
                </GridItem>
            </Grid >
            <Drawer
                size="lg"
                isOpen={isDrawerVerSessaoOpen}
                placement="right"
                onClose={onDrawerVerSessaoClose}
            >
                {rpgSelecionado && (
                    <DrawerVerSessaoRPG
                        isOpen={isDrawerVerSessaoOpen}
                        rpgInterface={rpgSelecionado}
                        onClose={onDrawerVerSessaoClose}

                    />
                )}
            </Drawer>

        </>
    )
}


