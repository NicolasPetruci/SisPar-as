import { Heading } from "@chakra-ui/react";

interface Props {
    fontFamily: "PersonaM" | "PersonaG",
    texto?: string,
    fontSize?: string,
    color?: string | "black",
    fontWeight?: string | "700"
}

export function TituloPersona(props: Props) {


    return (
        <>
            <Heading color={props.color} fontWeight={props.fontWeight} fontSize={props.fontSize} fontFamily={props.fontFamily}>
                {props.texto}
            </Heading>
        </>
    )
}
