
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Botao from "../../atomos/Botao/Botao";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";

interface propsNavbar {
    children?: JSX.Element;
}


export default function NavbarSistema(props: propsNavbar) {
    return (
        <>
            <Grid templateRows='repeat(1, 1fr)'
                templateColumns='repeat(10, 1fr)' flexDir="row">
                <GridItem >
                    <CaixaPadronizada distancia={"50px"} direcao="column" justificarComponente="center" alinharItem={"center"} larguraCaixa="5vw" alturaCaixa="100vh" bg="gray" >
                        <>
                            <Botao href="/rpg" descricao={"RPG"} fonte="arial" />

                            <Botao href="/parcasAwards" descricao={"Parças Awards"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/hallDaFama" descricao={"Hall da Fama"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/eventos" descricao={"Eventos"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/forum" descricao={"Forum"} fonte="arial" whiteSpace="wrap" />

                            <Botao href="/usuarios" descricao={"Usuarios"} fonte="arial" whiteSpace="wrap" />
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