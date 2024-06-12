
import { Button, Flex, Grid, GridItem, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import Botao from "../../atomos/Botao/Botao";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import { useAuth } from "../../../context/AuthContext";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";


interface propsNavbar {
    children?: JSX.Element;

}


export default function NavbarSistema(props: propsNavbar) {

    const { logout } = useAuth();
    return (
        <>
            <Grid templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)' flexDir="row">
                <GridItem zIndex={1} rowSpan={2} colSpan={1} mr='10vw' position='fixed' >
                    <CaixaPadronizada bg='black' distancia={"25px"} direcao="column" justificarComponente="center" alinharItem={"center"} larguraCaixa="10vw" alturaCaixa="100vh" >
                        <>

                            <Menu>
                                <MenuButton as={Button} >
                                    RPG
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title='Pessoal'>
                                        <MenuItem as='a' href='/meusrpgs'>Meus RPGS</MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup title='Geral'>
                                        <MenuItem as='a' href='/rpgsgerais'>Todos os RPGS</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>

                            {/* <Botao href="/parcasAwards" descricao={"Parças Awards"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/hallDaFama" descricao={"Hall da Fama"} fonte="arial" whiteSpace="wrap" /> */}

                            <Botao href="/eventos" descricao={"Eventos"} fonte="arial" whiteSpace="wrap" />

                            {/* <Botao href="/forum" descricao={"Forum"} fonte="arial" whiteSpace="wrap" /> */}
                            <ComponentePermissao cargo="DONO">
                                <Botao href="/usuarios" descricao={"Usuarios"} fonte="arial" whiteSpace="wrap" />
                            </ComponentePermissao>
                            <Botao aoClicar={logout} descricao={"Logout"} fonte="arial" whiteSpace="wrap" />
                        </>
                    </CaixaPadronizada>
                </GridItem>
                <GridItem rowSpan={2} colSpan={6}>
                    <Flex h='100%' w='80vw' marginY='10vh' marginX='15vw'>
                        {props.children}
                    </Flex>
                </GridItem>

            </Grid>
        </>
    )
}