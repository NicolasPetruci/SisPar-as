import Botao, { propsBotao } from "../../atomos/Botao/Botao";



interface propsBotaoGradiente extends propsBotao {
    estilo?: "roxo-aceita" | "amarelo-rejeita" | "preto-lilas" | "lilas-branco" | "roxo-amarelo" | "roxo-lilas";



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
            <Botao fonte={props.fonte} tamanhoTexto={props.tamanhoTexto} classe={props.estilo} descricao={props.children} larguraBotao={props.larguraBotao} />
        </>
    )
}