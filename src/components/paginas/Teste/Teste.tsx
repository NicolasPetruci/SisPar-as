//React
import React from "react";

//Componentes
import BotaoGradiente from "../../moleculas/BotaoGradiente/BotaoGradiente";
import NavbarSistemas from "../../organismos/NavbarSistema/NavbarSistema";
import { Grid, GridItem } from '@chakra-ui/react'

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


            </Grid>


        </>
    )
}