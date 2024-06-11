import { Button, Flex, Link, Text } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { TextoFormatado } from '../TextoFormatado/TextoFormatado';

export interface propsBotao {
    to?: string;
    href?: string;
    target?: string;
    descricao?: string | JSX.Element;
    borda?: string;
    corFundo?: string;
    corTexto?: string;
    pesoFonte?: string;
    marginX?: string;
    alturaBotao?: string | object;
    larguraBotao?: string | object
    arredondamentoBorda?: string;
    sombraBotao?: string;
    tamanhoTexto?: string;
    classe?: string;
    fonte?: string;
    whiteSpace?: string;
    children?: JSX.Element | string;
    aoClicar?: () => void;
}

const botaoEstilizado = (props: propsBotao) => {
    return (
        <Button
            w="100%"
            h="55px"
            borderRadius={props.arredondamentoBorda}
            border={props.borda}
            fontWeight={props.pesoFonte}
            color={props.corTexto}
            bgColor={props.corFundo}
            onClick={props.aoClicar}
            boxShadow={props.sombraBotao}
            className={props.classe}
        >
            <TextoFormatado whiteSpace={props.whiteSpace} color={props.corTexto} fontSize={props.tamanhoTexto} fontFamily={props.fonte} texto={props.descricao} />
            {props.children}
        </Button>
    );
};

export default function Botao(props: propsBotao): JSX.Element {
    if (props.to) {
        return (
            <Link
                as={LinkRouter}
                to={props.to}
                w={props.larguraBotao}
                marginX={props.marginX}
                _hover={{ textDecoration: 'none' }}
            >
                {botaoEstilizado(props)}
            </Link>
        );
    }

    if (props.href) {
        return (
            <Link
                href={props.href}
                target={props.target}
                w={props.larguraBotao}
                marginX={props.marginX}
                _hover={{ textDecoration: 'none' }}
            >
                {botaoEstilizado(props)}
            </Link>
        );
    }

    return (
        <Flex w={props.larguraBotao} _hover={{ textDecoration: 'none' }}>
            {botaoEstilizado(props)}
        </Flex>
    );
}