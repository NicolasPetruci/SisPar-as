import { Button } from "@chakra-ui/react";
import { TextoFormatado } from "../../atomos/TextoFormatado/TextoFormatado";
import Botao from "../../atomos/Botao/Botao";


interface propsBotaoGradiente {
    estilo?: "roxo-aceita" | "amarelo-rejeita" | "preto-lilas" | "lilas-branco" | "roxo-amarelo" | "roxo-lilas";
    children?: string | JSX.Element;
    fonte?: string;
    tamanhoDaFonte?: string;
}

/* 
Roxo-Aceita -> Botão de aceitar
Amarelo-Rejeita -> Botão de rejeitar/limpar
Preto-lilas -> Botão de cadastro
Lilas-Branco -> Botao generico
Roxo-Amarelo -> Alerta Negativo
Roxo-Lilas -> Alerta de confirmação
*/

export default function BotaoGradiente(props: propsBotaoGradiente) {
    return (
        <>
            <Botao fonte={props.fonte} tamanhoTexto={props.tamanhoDaFonte} classe={props.estilo} descricao={props.children} />
        </>
    )
}