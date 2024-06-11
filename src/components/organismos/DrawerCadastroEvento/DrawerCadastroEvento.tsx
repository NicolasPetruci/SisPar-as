import { useEffect, useState } from "react";
import Evento from "../../../interface/Evento";
import TipoEvento from "../../../interface/TipoEvento";
import { useEventoService } from "../../../services/hooks/useEventoService";
import { useTipoEventoService } from "../../../services/hooks/useTipoEventoService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup } from "@chakra-ui/react";
import { formatarData, imprimeDataInput } from "../../../services/data";

import Select from 'react-select'

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

    //data
    const nomeTipo = tipoEvento.map((tipo) => {
        return {
            label: tipo.descricao,
            value: tipo.id,
            data: tipo,
        };
    })









    // // buscar

    const buscarTipo = () => {
        try {
            tipoEventoService.getAllTipoEvento().then((tipoEvento) => setTipoEvento(tipoEvento))
        } catch (error) {
            console.log('não obtive participantes', error)

        }
    }

    //useEffect

    useEffect(() => {
        buscarTipo();

    }, []);

    //criarlista

    const criarListaTipo = (
        tipoSelecionado: TipoEvento[] | TipoEvento
    ) => {
        let novoTipo: TipoEvento[];

        if (tipoSelecionado instanceof Array) {
            novoTipo = tipoSelecionado.map(
                (tipo: TipoEvento) => {
                    return {
                        id: tipo.id,
                        descricao: tipo.descricao,
                    };
                }
            );
        } else {
            novoTipo = [
                {
                    id: tipoSelecionado.id,
                    descricao: tipoSelecionado.descricao,

                },
            ];
        }
        setEvento({
            ...evento,
            id_tipo_evento: novoTipo.map((tipo) => {
                return tipo;
            }),
        });
    };



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

                        <form>
                            <FormLabel>Online:</FormLabel>
                            <RadioGroup
                                display="flex"
                                gap='10'
                                defaultValue={evento.online}
                                onChange={(value) => {

                                    setUpdateEvento({
                                        ...updateEvento,
                                        online: value === "Sim" ? "Sim" : "Não",
                                    });
                                }}
                            >
                                <Radio border='1px solid black' value="Sim" colorScheme="teal">Sim</Radio>
                                <Radio border='1px solid black' value="Não" colorScheme="red">Não</Radio>
                            </RadioGroup>
                        </form>

                        <FormLabel>Tipo Evento:</FormLabel>
                        <Select options={nomeTipo} defaultValue={evento.id_tipo_evento.map((tipo) => ({
                            label: tipo.descricao,
                            value: tipo.id,
                            data: tipo,
                        }))}>

                        </Select>

                        <FormLabel>
                            Data:
                        </FormLabel>
                        <Input type='datetime-local' defaultValue={imprimeDataInput(evento.data_hora!)} onChange={(e) => {
                            const dataConvertida = formatarData(e.target.value)
                            setUpdateEvento({
                                ...updateEvento,
                                data_hora: dataConvertida,
                            })
                        }} />







                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={atualizarEvento}></Button>
                    </DrawerFooter>

                </DrawerContent>


            </Drawer>

        </>
    )

}



