//React
import React from "react";
import { TituloPersona } from "../../atomos/TituloPersona/TituloPersona";
import { IconeTeste } from "../../atomos/ChakraIcon/ChakraIcon";

//Componentes


export default function HomeSite() {
    return (
        <>
            <TituloPersona fontFamily="PersonaM" texto="Laele" fontSize="100" color="cor.P1" />
            <IconeTeste boxSize={10} />
        </>
    )
}