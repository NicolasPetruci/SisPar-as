import { Text } from "@chakra-ui/react";

interface Props {
    fontFamily?: string | "PersonaG",
    texto?: string | JSX.Element,
    fontSize?: string | "12",
    color?: string | "black",

}

export function TextoFormatado(props: Props) {

    return (
        <>
            <Text color={props.color} fontSize={props.fontSize} fontFamily={props.fontFamily || "PersonaM"}>
                {props.texto}
            </Text>
        </>
    )
}
