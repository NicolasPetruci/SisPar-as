import { Flex } from '@chakra-ui/react';

interface PropsCaixaPadronizada {
    children?: JSX.Element;
    alturaCaixa?: string | { [key: string]: string };
    larguraCaixa?: string | { [key: string]: string };
    bordaRaio?: string | { [key: string]: string };
    sombra?: string | { [key: string]: string };
    distanciaCima?: string | { [key: string]: string };
    distanciaBaixo?: string | { [key: string]: string };
    distanciaEsquerda?: string | { [key: string]: string };
    distanciaDireita?: string | { [key: string]: string };
    preenchimento?: string | { [key: string]: string };
    bg?: string | { [key: string]: string };
    justificarComponente?: string | { [key: string]: string };
    alinharItem?: string | { [key: string]: string };
    distancia?: string | { [key: string]: string };
    margem?: string;
    borda?: string;
    direcao?: "row" | "column";
}

/*
xs: Sombra extremamente leve
sm: Sombra Leve
base: Sombra na base da box/flex 
md: Sombra um pouco mais forte que o base
lg: Sombra um pouco mais forte que o md
xl: sombra mais forte que o lg
2xl: sombra bem maior que a do xl
Dark-Lg: sombra bem mais escura que pega boa parte
outline: cria uma ''borda''
inner: a sombra é dentro
*/

export default function CaixaPadronizada(props: PropsCaixaPadronizada) {
    return (
        <>
            <Flex
                w={props.larguraCaixa || '100%'}
                h={props.alturaCaixa || '100%'}
                boxShadow={props.sombra || 'dark-lg'}
                borderRadius={props.bordaRaio || '0px'}
                mb={props.distanciaBaixo || '10px'}
                mt={props.distanciaCima || '10px'}
                mr={props.distanciaDireita || '0px'}
                ml={props.distanciaEsquerda || '0px'}
                p={props.preenchimento || '20px'}
                bg={props.bg || 'dark'}
                justifyContent={props.justificarComponente || 'center'}
                alignItems={props.alinharItem || 'center'}
                gap={props.distancia || '0px'}
                margin={props.margem || '0'}
                border={props.borda || '0'}
                flexDirection={props.direcao || "row"}
            >
                {props.children}
            </Flex>
        </>
    );
}
