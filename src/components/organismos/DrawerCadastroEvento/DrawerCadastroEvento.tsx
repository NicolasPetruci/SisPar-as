import { useEffect, useState } from "react";
import Evento from "../../../interface/Evento";
import TipoEvento from "../../../interface/TipoEvento";
import { useEventoService } from "../../../services/hooks/useEventoService";
import { useTipoEventoService } from "../../../services/hooks/useTipoEventoService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";

interface propsEvento {
    isOpen: boolean;
    onClose: () => void;
    eventoInterface: Evento;
    onUpdate: (eventoAtualizado: Evento) => void;
}


export default function DrawerCadastroEvento({
    isOpen,
    onClose,
    eventoInterface,
    onUpdate,
}: propsEvento) {

    //declaração
    const [evento, setEvento] = useState<Evento>(eventoInterface);
    const [tipoEvento, setTipoEvento] = useState<TipoEvento[]>([]);


    const eventoService = useEventoService();
    const tipoEventoService = useTipoEventoService();

    const [updateEvento, setUpdateEvento] = useState<Evento>({
        nome: evento ? evento.nome : "",
        data_hora: evento ? evento.data_hora : new Date().toISOString(),
        descricao: evento ? evento.descricao : "",
        local: evento ? evento.local : "",
        online: evento ? evento.online : "Não",
        id_tipo_evento: evento ? evento.id_tipo_evento : [],
    })

    const nomeTipo = tipoEvento.map((tipoEvento) => {
        return {
            label: tipoEvento.descricao,
            value: tipoEvento.id,
            data: tipoEvento,
        }
    })

    // buscar

    const buscarTipo = () => {
        try {
            tipoEventoService.getAllTipoEvento().then((tipoEvento) => setTipoEvento(tipoEvento))
        } catch (error) {
            console.log('não obtive participantes', error)

        }
    }

    //CriarListaTipo

    const criarListaTipo = (tipoSelecionado: TipoEvento[] | TipoEvento) => {
        let novoTipo: TipoEvento[];

        if (tipoSelecionado instanceof Array) {
            novoTipo = tipoSelecionado.map((tipo: TipoEvento) => {
                return {
                    id: tipo.id,
                    descricao: tipo.descricao,
                }
            })

        } else {
            novoTipo = [
                {
                    id: tipoSelecionado.id,
                    descricao: tipoSelecionado.descricao,
                }
            ]
        }
        setEvento({
            ...evento,
            id_tipo_evento: novoTipo.map((tipoEvento) => {
                return tipoEvento
            }),
        })
    }

    //useEffect

    useEffect(() => {
        buscarTipo();
        criarListaTipo(evento.id_tipo_evento);
    }, []);

    //Atualizar

    const atualizarEvento = async () => {
        try {
            if (updateEvento) {
                const id = evento.id!.toString();

                await eventoService.updateEvento(id, updateEvento).then(() => {
                    console.log('deu bom viado, ta atualizado')
                })
                onUpdate(updateEvento);
            }
        } catch (error) {
            console.log('deu ruim', error)
        }
    }

    //onchangeselect

    const handleChange = (e: any) => {
        setTipoEvento(e.target.value);
    };
    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Atualizar Informações - {evento.nome}
                    </DrawerHeader>
                    <DrawerBody>
                        <FormLabel>
                            Nome:
                        </FormLabel>
                        <Input type='text' defaultValue={evento.nome} onChange={(e) => {
                            setUpdateEvento({
                                ...updateEvento,
                                nome: e.target.value,
                            })
                        }} />

                        <FormLabel>
                            Local:
                        </FormLabel>
                        <Input type='text' defaultValue={evento.local} onChange={(e) => {
                            setUpdateEvento({
                                ...updateEvento,
                                local: e.target.value,
                            })
                        }} />

                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input type='text' defaultValue={evento.descricao} onChange={(e) => {
                            setUpdateEvento({
                                ...updateEvento,
                                descricao: e.target.value,
                            })
                        }} />

                        <FormControl>
                            <FormLabel>Online:</FormLabel>
                            <RadioGroup
                                display="flex"
                                gap="12px"
                                defaultValue={evento.online}
                                onChange={(e) => {
                                    setUpdateEvento({
                                        ...updateEvento,
                                        online: e === "Sim" ? "Sim" : "Não",
                                    });
                                }}
                            >
                                <Radio value="Sim" colorScheme="teal">Sim</Radio>
                                <Radio value="Não" colorScheme="red">Não</Radio>
                            </RadioGroup>
                        </FormControl>

                        {/* <FormLabel>
                            Tipo Evento:
                        </FormLabel>
                        <Select onChange={handleChange}>
                            {tipoEvento.map((tipo) => (
                                <option key={tipo.id} value={tipo.descricao}>
                                    {tipo.descricao}
                                </option>
                            ))}
                        </Select> */}





                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={atualizarEvento}></Button>
                    </DrawerFooter>

                </DrawerContent>


            </Drawer>

        </>
    )

}




