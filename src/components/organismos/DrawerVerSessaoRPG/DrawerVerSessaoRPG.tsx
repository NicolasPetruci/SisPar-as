import { useEffect, useState } from "react";
import RPG from "../../../interface/RPG";
import GeneroRPG from "../../../interface/GeneroRPG";
import { useRPGService } from "../../../services/hooks/useRPGService";
import { useGeneroRPGService } from "../../../services/hooks/useGeneroRPGService";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import Usuario from "../../../interface/Usuario";
import { useSessaoService } from "../../../services/hooks/useSessaoService";
import Sessao from "../../../interface/Sessao";


interface propsRPG {
    isOpen: boolean;
    onClose: () => void;
    rpgInterface: RPG;
}

export default function DrawerVerSessaoRPG({
    isOpen,
    onClose,
    rpgInterface,

}: propsRPG) {

    //declaração


    const [rpg, setRPG] = useState<RPG>(rpgInterface);


    const [sessao, setSessao] = useState<Sessao[]>([]);
    const [generoRPG, setGeneroRPG] = useState<GeneroRPG[]>([]);
    const [usuario, setUsuario] = useState<Usuario>()
    const rpgService = useRPGService();
    const generoRPGService = useGeneroRPGService();
    const sessaoService = useSessaoService();


    const [updateRPG, setUpdateRPG] = useState<RPG>({
        nome: rpg ? rpg.nome : "",
        descricao: rpg ? rpg.descricao : "",
        generos: rpg ? rpg.generos : []
    })

    const nomeGeneros = generoRPG.map((genero => {
        return {
            label: genero.descricao,
            value: genero.id,
            data: genero
        }
    }))

    // buscar

    const buscarSessoes = (id: number) => {
        try {
            sessaoService.getSessao(id).then((sessao) => setSessao(sessao))
        } catch (error) {
            console.log('não obtive rpg', error)

        }
    }



    //useEffect

    useEffect(() => {

        buscarSessoes(rpg.id ? rpg.id : 0);


    }, []);



    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} size='full'>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Sessões do RPG - {rpg.nome}
                    </DrawerHeader>
                    <DrawerBody >
                        <Flex w='100%' justifyContent={"center"} alignItems={"center"} flexDir={'column'}>

                            <TableContainer>
                                <Table variant='striped' colorScheme='purple'>
                                    <TableCaption>{rpg.nome}</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>NOME</Th>
                                            <Th>DESCRICAO</Th>
                                            <Th>DATA</Th>
                                            <Th>TEMPORADA</Th>
                                            <Th>CAPÍTULO</Th>
                                            <Th>MESTRE</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {sessao.map((sessao, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{sessao.nome}</Td>
                                                <Td whiteSpace={'wrap'}>{sessao.descricao}</Td>
                                                <Td whiteSpace={'wrap'}>{sessao.data_hora}</Td>
                                                <Td whiteSpace={'wrap'}>{sessao.temporada}</Td>
                                                <Td whiteSpace={'wrap'}>{sessao.numero}</Td>
                                                <Td whiteSpace={'wrap'}>{sessao.rpg.mestre?.usuario.nome}</Td>
                                            </Tr>
                                        ))}

                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>NOME</Th>
                                            <Th>DESCRICAO</Th>
                                            <Th>DATA</Th>
                                            <Th>TEMPORADA</Th>
                                            <Th>CAPÍTULO</Th>
                                            <Th>MESTRE</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>

                        </Flex>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )





}
