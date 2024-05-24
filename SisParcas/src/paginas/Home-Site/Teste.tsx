//React
import React from "react";

//Componentes
import BotaoGradiente from "../../moleculas/Botao/BotaoGradiente";
import Botao from "../../atomos/Botao/Botao";

export default function Teste() {
    return (
        <>
            <BotaoGradiente estilo={"roxo-lilas"}>Roxo-Lilas</BotaoGradiente>

            <BotaoGradiente estilo={"amarelo-rejeita"}>Amarelo-Rejeita</BotaoGradiente>

            <BotaoGradiente estilo={"lilas-branco"}>lilas-Branco</BotaoGradiente>

            <BotaoGradiente estilo={"roxo-aceita"}>Roxo-Aceita</BotaoGradiente>

            <BotaoGradiente estilo={"roxo-amarelo"}>Roxo-Amarelo</BotaoGradiente>

            <BotaoGradiente estilo={"preto-lilas"}>preto-Lilas</BotaoGradiente>

            <Botao descricao="teste" />
        </>
    )
}