import TipoEvento from "../../../interface/TipoEvento"
import Evento from "../../../interface/Evento"
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../../interface/Usuario";
import { useEventoService } from "../../../services/hooks/useEventoService";
import { useTipoEventoService } from "../../../services/hooks/useTipoEventoService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import { imprimeDataInput, formatarData } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";

interface propsEventoCadastro {
    isOpen: boolean;
    onClose: () => void;
}

export default function DrawerCadastroEvento({
    isOpen,
    onClose,

}: propsEventoCadastro) {
    const [evento, setEvento] = useState<Evento>({
        nome: "",
        descricao: "",
        local: "",
        online: "",
        data_hora: "",
        tipo_evento: {
            id: 0,
            descricao: "",
        },
        id_tipo_evento: 0,
        participantes: [],
    });
    const [tipoEvento, setTipoEvento] = useState<TipoEvento[]>([]);
    const [usuario, setUsuario] = useState<Usuario>()
    const eventoService = useEventoService();
    const tipoEventoService = useTipoEventoService();
    const usuarioService = useUsuarioService();

    const buscarTipo = () => {
        try {
            tipoEventoService.getAllTipoEvento().then((tipoEvento) => setTipoEvento(tipoEvento))
        } catch (error) {
            console.log('não obtive participantes', error)

        }
    }

    const buscarUsuario = () => {
        try {
            usuarioService.getUsuarioLogged().then((usuario) => setUsuario(usuario))

        } catch (error) {
            console.log('não tem usuarios', error)
        }
    }

    //useEffect

    useEffect(() => {
        buscarTipo();
        buscarUsuario();

    }, []);

    //criarEvento

    const cadastrarEvento = () => {
        try {
            eventoService.createEvento(evento).then((eventoCadastrado) => {
                console.log('Evento cadastrado')
            })
        } catch (error) {
            console.log('erro ao cadastrar evento', error)
        }
    }

    //arrowfunctions

    const cadastroDadosEvento = (e: ChangeEvent<HTMLInputElement>) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value,
        });
    };

    const cadastroTempoEvento = (e: any) => {
        const dataConvertida = formatarData(e.target.value);
        setEvento({
            ...evento,
            [e.target.name]: dataConvertida,
        });
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
                        <Input name='nome' type='text' defaultValue={evento.nome} onChange={cadastroDadosEvento} />

                        <FormLabel>
                            Local:
                        </FormLabel>
                        <Input name='local' type='text' defaultValue={evento.local} onChange={cadastroDadosEvento} />

                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input name='descricao' type='text' defaultValue={evento.descricao} onChange={cadastroDadosEvento} />

                        <form>
                            <FormLabel>Online:</FormLabel>
                            <RadioGroup
                                display="flex"
                                gap='10'
                                
                            >
                                <Radio border='1px solid black' value="Sim" onChange={cadastroDadosEvento} colorScheme="teal">Sim</Radio>
                                <Radio border='1px solid black' value="Não" onChange={cadastroDadosEvento} colorScheme="red">Não</Radio>
                            </RadioGroup>
                        </form>

                        <FormLabel>Tipo Evento:</FormLabel>
                        <Select
                            onChange={(e) => {
                                const descricaoSelecionada = e.target.value;
                                const tipoEventoSelecionado = tipoEvento.find(tipo => tipo.descricao === descricaoSelecionada);
                                if (tipoEventoSelecionado) {
                                    setEvento({
                                        ...evento,
                                        tipo_evento: tipoEventoSelecionado,
                                    });
                                }
                            }}
                        >
                            {tipoEvento.map(tipo => (
                                <option key={tipo.id} value={tipo.descricao}>
                                    {tipo.descricao}
                                </option>
                            ))}
                        </Select>
                        <FormLabel>
                            Data:
                        </FormLabel>
                        <Input name="data" type='datetime-local' defaultValue={imprimeDataInput(evento.data_hora!)} onChange={cadastroTempoEvento} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={cadastrarEvento}> Cadastrar</Button>
                        </ComponentePermissao>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >


        </>
    )

}