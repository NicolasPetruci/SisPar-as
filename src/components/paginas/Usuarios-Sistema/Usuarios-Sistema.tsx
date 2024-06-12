import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Usuario from "../../../interface/Usuario";
import { useEffect, useState } from "react";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import DrawerAtualizarUsuario from "../../organismos/DrawerAtualizarUsuario/DrawerAtualizarUsuario.tsx";
import DrawerCadastroUsuario from "../../organismos/DrawerCadastroUsuario/DrawerCadastroUsuario";



export default function UsuarioSistema() {

    //declarações

    const [usuario, setUsuario] = useState<Usuario[]>([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
    const usuarioService = useUsuarioService();

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerCadastroOpen, onOpen: onDrawerCadastroOpen, onClose: onDrawerCadastroClose } = useDisclosure();

    //busca
    const buscarUsuario = () => {
        try {
            usuarioService.getAllUsuario().then((usuario) => setUsuario(usuario));
        } catch (error) {
            alert("Erro ao obter usuarios");

        }
    }
    useEffect(() => {
        buscarUsuario();

    }, [])

    //deleta
    // const deletarUsuario = async (idUsuario: string) => {
    //     usuarioService.deleteUsuario(idUsuario);
    //     buscarUsuario();
    // };

    //atualiza
    const atualizarUsuario = (usuarioAtualizado: Usuario) => {
        setUsuario((usuarioPrevias) => {
            const usuariosAtualizados = usuarioPrevias.map((usuario) => {
                if (usuario.id === usuarioAtualizado.id) {
                    return usuarioAtualizado;
                }
                return usuario;
            });
            return usuariosAtualizados;
        });
    };

    const abrirDrawerAtualizar = (usuario: Usuario) => {
        setUsuarioSelecionado(usuario);
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
                                <Text textAlign="justify">Um CRUD de usuarios é uma aplicação essencial para organizar e controlar usuarios de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar usuarios de maneira intuitiva e eficaz.</Text>
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
                                            <Th>TELEFONE</Th>
                                            <Th>AÇÃO</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {usuario.map((usuario, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{usuario.id}</Td>
                                                <Td whiteSpace={'wrap'}>{usuario.nome}</Td>
                                                <Td whiteSpace={'wrap'}>{usuario.telefone}</Td>
                                                <Td>
                                                    <Flex>
                                                        {/* <Button className="amarelo-rejeita" onClick={() => deletarUsuario(usuario.id!.toString())}> D</Button> */}
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawerAtualizar(usuario)}> V </Button>
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>NOME</Th>
                                            <Th>TELEFONE</Th>
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
                                    {usuarioSelecionado && (
                                        <DrawerAtualizarUsuario
                                            isOpen={isDrawerAtualizarOpen}
                                            usuarioInterface={usuarioSelecionado}
                                            onClose={onDrawerAtualizarClose}
                                            onUpdate={atualizarUsuario}
                                        />
                                    )}
                                </Drawer>

                                <Drawer
                                    size="lg"
                                    isOpen={isDrawerCadastroOpen}
                                    placement="right"
                                    onClose={onDrawerCadastroClose}
                                >
                                    {usuarioSelecionado && (
                                        <DrawerCadastroUsuario
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


