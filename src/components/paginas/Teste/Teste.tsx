

//Componentes
import BotaoGradiente from "../../moleculas/BotaoGradiente/BotaoGradiente";
import { Grid, GridItem } from '@chakra-ui/react'
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";

export default function Teste() {
    return (
        <>
            <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                <GridItem>

                </GridItem>
                <GridItem>
                    <BotaoGradiente estilo={"roxo-aceita"} larguraBotao={"10px"}>Roxo-Lilas</BotaoGradiente>
                </GridItem>
                <GridItem>
                    <BotaoGradiente estilo={"amarelo-rejeita"} larguraBotao={"10px"} fonte="">Roxo-Lilas</BotaoGradiente>
                </GridItem>
                <GridItem>
                    <BotaoGradiente estilo={"roxo-lilas"} larguraBotao={"10px"}>Roxo-Lilas</BotaoGradiente>
                </GridItem>
                <GridItem>
                    <BotaoGradiente estilo={"roxo-amarelo"} larguraBotao={"10px"}>Roxo-Lilas</BotaoGradiente>
                </GridItem>

                <ComponentePermissao cargo="">
                    <>
                        oi gata
                    </>
                </ComponentePermissao>

            </Grid>


        </>
    )
}