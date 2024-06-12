

import GeneroRPG from "../../../interface/GeneroRPG"
import RPG from "../../../interface/RPG"
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../../interface/Usuario.tsx";
import { useRPGService } from "../../../services/hooks/useRPGService";
import { useGeneroRPGService } from "../../../services/hooks/useGeneroRPGService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, Textarea } from "@chakra-ui/react";
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import { formatarData } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import Sessao from "../../../interface/Sessao.tsx";
import TipoEvento from "../../../interface/TipoEvento.tsx";
import { useSessaoService } from "../../../services/hooks/useSessaoService.tsx";
import CustomSelect from "./ComponenteSelect/ComponenteSelect.tsx";

interface propsRPGCadastroSessao {
    isOpen: boolean;
    onClose: () => void;

}

export default function DrawerCadastroSessao({
    isOpen,
    onClose,

}: propsRPGCadastroSessao) {
    const [sessao, setSessao] = useState<Sessao>({
        nome: "",
        descricao: "",
        data_hora: "",
        temporada: 0,
        numero: 0,
        rpg: {
            id: 0,
            nome: "",
        },
        jogadores: [],
    });
    const [rpg, setRPG] = useState<RPG | undefined>(undefined);
    const [jogadores, setJogador] = useState<Usuario[]>([])
    const sessaoService = useSessaoService();
    const rpgService = useRPGService();
    const usuarioService = useUsuarioService()

    const [jogadoresSelecionado, setJogadorSelecionado] = useState<Usuario[]>([
        {
            id: 0,
            nome: "",
        }
    ])



    const nomeJogador = jogadores?.map((jogadores) => {
        return {
            label: jogadores.nome,
            value: jogadores.id,
            data: jogadores,
        }
    })

    const options = rpg ? [{ id: rpg.id || 0, nome: rpg.nome }] : [];

    const criarListaJogadors = (
        jogadoresSelecionado: Usuario[] | Usuario
    ) => {
        let novoJogador: Usuario[];

        if (jogadoresSelecionado instanceof Array) {
            novoJogador = jogadoresSelecionado.map(
                (jogadores: Usuario) => {
                    return {
                        id: jogadores.id,
                        nome: jogadores.nome,


                    };
                }
            );
        } else {
            novoJogador = [
                {
                    id: jogadoresSelecionado.id,
                    nome: jogadoresSelecionado.nome,

                },
            ];
        }
        setSessao({
            ...sessao,
            jogadores: novoJogador.map((jogadores) => {
                return jogadores;
            }),
        });
    }


    const buscarRPG = () => {
        try {
            rpgService.getAllRPG().then((rpg) => setRPG(rpg))
        } catch (error) {
            console.log('não obtive jogadoreses', error)

        }
    }

    const buscarUsuario = () => {
        try {
            usuarioService.getAllUsuario().then((usuario) => setJogador(usuario))

        } catch (error) {
            console.log('não tem usuarios', error)
        }
    }



    //useEffect

    useEffect(() => {
        buscarRPG();
        buscarUsuario();
        criarListaJogadors(jogadores);

    }, []);


    //criarRPG

    const cadastrarSessao = () => {
        try {
            sessaoService.createSessao(sessao).then(() => {
                console.log("cadastrou a sessao")
            })

        } catch (error) {
            console.log('erro ao cadastrar sessao', error)
        }
    }

    //arrowfunctions

    const cadastroDadosSessao = (e: ChangeEvent<HTMLInputElement>) => {
        setSessao({
            ...sessao,
            [e.target.name]: e.target.value,
        });
    };

    const cadastroTempoSessao = (e: any) => {
        const dataConvertida = e.target.value;
        setSessao({
            ...sessao,
            [e.target.name]: dataConvertida,
        });
        console.log(dataConvertida)
    }

    const cadastroNumerosEvento = (e: any) => {
        setSessao({
            ...sessao,
            [e.target.name]: parseInt(e.target.value),
        });
    };




    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Cadastrar Informações
                    </DrawerHeader>
                    <DrawerBody>

                        <FormLabel>
                            Nome:
                        </FormLabel>
                        <Input name='nome' type='text' onChange={cadastroDadosSessao} />

                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input name='descricao' type='text' onChange={cadastroDadosSessao} />

                        <FormControl>
                            <FormLabel>Participantes</FormLabel>
                            <Select
                                placeholder="Selecionar Jogador"
                                isMulti
                                closeMenuOnSelect={false}
                                name='sessoes'
                                options={nomeJogador}
                                onChange={(event) => {

                                    setJogadorSelecionado(
                                        event.map((jogadores) => jogadores.data)
                                    )
                                }
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Selecionar RPG</FormLabel>

                        </FormControl>
                        <CustomSelect

                            value={sessao.rpg.nome}
                            onChange={(descricaoSelecionada) => {
                                const rpgSelecionado = options.find((rpg) => rpg.nome === descricaoSelecionada);
                                if (rpgSelecionado) {
                                    setSessao({
                                        ...sessao,
                                        rpg: rpgSelecionado,
                                    });
                                }
                            }}
                            options={options}
                        />

                        <FormLabel>
                            Data
                        </FormLabel>
                        <Input name="data_hora" type='datetime-local' onChange={cadastroTempoSessao} />

                        <FormLabel>
                            Temporada
                        </FormLabel>
                        <Input name="temporada" type='number' onChange={cadastroNumerosEvento} />

                        <FormLabel>
                            Capítulo
                        </FormLabel>
                        <Input name="numero" type='number' onChange={cadastroNumerosEvento} />

                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={cadastrarSessao}> Cadastrar</Button>
                        </ComponentePermissao>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >


        </>
    )

}
