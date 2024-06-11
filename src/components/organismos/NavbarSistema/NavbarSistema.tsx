
import { Flex, Grid, GridItem } from "@chakra-ui/react";
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
            <Grid templateRows='repeat(1, 1fr)'
                templateColumns='repeat(10, fr)' flexDir="row">
                <GridItem >
                    <CaixaPadronizada distancia={"25px"} direcao="column" justificarComponente="center" alinharItem={"center"} larguraCaixa="10vw" alturaCaixa="100vh" bg="gray" >
                        <>
                            <ComponentePermissao cargo="MESTRE,ADM">
                                <>
                                    <Botao href="/rpg" descricao={"RPG"} fonte="arial" />
                                </>
                            </ComponentePermissao>

                            <Botao href="/parcasAwards" descricao={"Parças Awards"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/hallDaFama" descricao={"Hall da Fama"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/eventos" descricao={"Eventos"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/forum" descricao={"Forum"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/usuarios" descricao={"Usuarios"} fonte="arial" whiteSpace="wrap" />

                            <Botao aoClicar={logout} descricao={"Logout"} fonte="arial" whiteSpace="wrap" />
                        </>
                    </CaixaPadronizada>
                </GridItem>
                <GridItem mt="10vh">
                    {props.children}
                </GridItem>

            </Grid>
        </>
    )
}