import { useEffect, useState } from "react";
import Evento from "../../../interface/Evento";
import TipoEvento from "../../../interface/TipoEvento";
import { useEventoService } from "../../../services/hooks/useEventoService";
import { useTipoEventoService } from "../../../services/hooks/useTipoEventoService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { formatarData, imprimeDataInput } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import Usuario from "../../../interface/Usuario";


interface propsEvento {
    isOpen: boolean;
    onClose: () => void;
    eventoInterface: Evento;
    onUpdate: (eventoAtualizado: Evento) => void;
}

export default function DrawerAtualizarEvento({
    isOpen,
    onClose,
    eventoInterface,
    onUpdate,
}: propsEvento) {

    //declaração
    const [evento, setEvento] = useState<Evento>(eventoInterface);
    const [tipoEvento, setTipoEvento] = useState<TipoEvento[]>([]);
    const [isInscrito, setIsInscrito] = useState(Boolean)
    const [usuario, setUsuario] = useState<Usuario>()
    const eventoService = useEventoService();
    const tipoEventoService = useTipoEventoService();
    const usuarioService = useUsuarioService();


    const [updateEvento, setUpdateEvento] = useState<Evento>({
        nome: evento ? evento.nome : "",
        data_hora: evento ? evento.data_hora : new Date().toISOString(),
        descricao: evento ? evento.descricao : "",
        local: evento ? evento.local : "",
        online: evento ? evento.online : "Não",
        id_tipo_evento: evento ? evento.id_tipo_evento : 0,
        tipo_evento: evento ? evento.tipo_evento : {
            descricao: "",
            id: 0,
        },
        participantes: evento ? evento.participantes : []

    })

    // buscar

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

    useEffect(() => {
        if (usuario) {
            verificarInscricao();
        }
    }, [usuario, evento.id]);

    const verificarInscricao = () => {
        if (evento.id === undefined) return;  // Verificação de segurança
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '{}');
        if (usuario && inscricoes[evento.id] && inscricoes[evento.id].includes(usuario.id)) {
            setIsInscrito(true);
        }
    };

    const salvarInscricao = () => {
        if (evento.id === undefined) return;  // Verificação de segurança
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '{}');
        if (!inscricoes[evento.id]) {
            inscricoes[evento.id] = [];
        }
        if (usuario) {
            inscricoes[evento.id].push(usuario.id);
        }
        localStorage.setItem('inscricoes', JSON.stringify(inscricoes));
    };

    const removerInscricao = () => {
        if (evento.id === undefined) return;  // Verificação de segurança
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '{}');
        if (inscricoes[evento.id]) {
            if (usuario) {
                inscricoes[evento.id] = inscricoes[evento.id].filter((id: number) => id !== usuario.id);
            }
        }
        localStorage.setItem('inscricoes', JSON.stringify(inscricoes));
    };

    const inscreverEvento = async (idEvento: string) => {
        try {
            await eventoService.inscreverEvento(idEvento);
            setIsInscrito(true);
            const novoParticipante = usuario;
            if (novoParticipante) {
                setEvento({
                    ...evento,
                    participantes: [...evento.participantes, novoParticipante],
                });

                salvarInscricao();


            }
        } catch (error) {
            console.log('Erro ao inscrever no evento', error);
        }
    };

    const desinscreverEvento = async (idEvento: string) => {
        try {
            await eventoService.desinscreverEvento(idEvento);
            setIsInscrito(false);
            removerInscricao();


        } catch (error) {
            console.log('Erro ao cancelar inscrição', error);
        }
    };


    //Atualizar

    const atualizarEvento = async () => {
        try {
            if (updateEvento) {
                updateEvento.id = evento.id;

                await eventoService.updateEvento(updateEvento).then(() => {
                    console.log('deu bom manp, ta atualizado')
                })
                onUpdate(updateEvento);
            }
        } catch (error) {
            console.log('deu ruim', error)
        }
    }

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
                            Id
                        </FormLabel>
                        <Input type='number' defaultValue={evento.id} onChange={(e) => {
                            setUpdateEvento({
                                ...updateEvento,
                                id: parseInt(e.target.value),
                            })
                        }} />

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
                        <Select
                            value={evento.tipo_evento.descricao}
                            onChange={(e) => {
                                const descricaoSelecionada = e.target.value;
                                const tipoEventoSelecionado = tipoEvento.find(tipo => tipo.descricao === descricaoSelecionada);
                                if (tipoEventoSelecionado) {
                                    setUpdateEvento({
                                        ...updateEvento,
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
                        <Input type='datetime-local' defaultValue={imprimeDataInput(evento.data_hora!)} onChange={(e) => {
                            const dataConvertida = formatarData(e.target.value)
                            setUpdateEvento({
                                ...updateEvento,
                                data_hora: dataConvertida,
                            })
                        }} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={atualizarEvento}> Atualizar</Button>
                        </ComponentePermissao>
                        {isInscrito === true ? <Button className="lilas-branco" onClick={() => desinscreverEvento(evento.id!.toString())}>Cancelar Inscrição</Button> : <Button className="roxo-amarelo" onClick={() => inscreverEvento(evento.id!.toString())}>Inscrever</Button>}


                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )

}




