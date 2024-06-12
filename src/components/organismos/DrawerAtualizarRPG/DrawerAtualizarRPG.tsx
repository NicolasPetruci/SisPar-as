import { useEffect, useState } from "react";
import RPG from "../../../interface/RPG";
import GeneroRPG from "../../../interface/GeneroRPG";
import { useRPGService } from "../../../services/hooks/useRPGService";
import { useGeneroRPGService } from "../../../services/hooks/useGeneroRPGService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup } from "@chakra-ui/react";
import { formatarData, imprimeDataInput } from "../../../services/data";
import Select from 'react-select';
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import Usuario from "../../../interface/Usuario";


interface propsRPG {
    isOpen: boolean;
    onClose: () => void;
    rpgInterface: RPG;
    onUpdate: (rpgAtualizado: RPG) => void;
}

export default function DrawerAtualizarRPG({
    isOpen,
    onClose,
    rpgInterface,
    onUpdate,
}: propsRPG) {

    //declaração
    const [rpg, setRPG] = useState<RPG>(rpgInterface);
    const [generoRPGSelecionado, setGeneroRPGSelecionado] = useState<GeneroRPG[]>(rpg.generos ? rpg.generos : []);
    const [generoRPG, setGeneroRPG] = useState<GeneroRPG[]>([]);
    const [isInscrito, setIsInscrito] = useState(Boolean)
    const [usuario, setUsuario] = useState<Usuario>()
    const rpgService = useRPGService();
    const generoRPGService = useGeneroRPGService();
    const usuarioService = useUsuarioService();


    const [updateRPG, setUpdateRPG] = useState<RPG>({
        nome: rpg ? rpg.nome : "",
        descricao: rpg ? rpg.descricao : "",
        generos: rpg ? rpg.generos : []
    })

    // buscar

    const buscarGeneros = () => {
        try {
            generoRPGService.getAllGeneroRPG().then((generoRPG) => setGeneroRPG(generoRPG))
        } catch (error) {
            console.log('não obtive generos', error)

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
        buscarGeneros();
        buscarUsuario();

    }, []);

    useEffect(() => {
        if (usuario) {
            verificarInscricao();
        }
    }, [usuario, rpg.id]);
    useEffect(() => {
        async function criarListaGeneros(
        generoSelecionado: GeneroRPG[] | GeneroRPG
        ) {
        let novoGenero: GeneroRPG[];

            novoGenero = generoRPGSelecionado.map(
                (generoRPG: GeneroRPG) => {
                return {
                    id: generoRPG.id,
                    descricao: generoRPG.descricao,
                };
                }
            );
        setRPG({
            ...rpg,
            generos: novoGenero.map((generoRPG) => {
            return generoRPG;
            }),
        });
    }});
    const verificarInscricao = () => {
        if (rpg.id === undefined) return;  // Verificação de segurança
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '{}');
        if (usuario && inscricoes[rpg.id] && inscricoes[rpg.id].includes(usuario.id)) {
            setIsInscrito(true);
        }
    };

    const salvarInscricao = () => {
        if (rpg.id === undefined) return;  // Verificação de segurança
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '{}');
        if (!inscricoes[rpg.id]) {
            inscricoes[rpg.id] = [];
        }
        if (usuario) {
            inscricoes[rpg.id].push(usuario.id);
        }
        localStorage.setItem('inscricoes', JSON.stringify(inscricoes));
    };

    const removerInscricao = () => {
        if (rpg.id === undefined) return;  // Verificação de segurança
        const inscricoes = JSON.parse(localStorage.getItem('inscricoes') || '{}');
        if (inscricoes[rpg.id]) {
            if (usuario) {
                inscricoes[rpg.id] = inscricoes[rpg.id].filter((id: number) => id !== usuario.id);
            }
        }
        localStorage.setItem('inscricoes', JSON.stringify(inscricoes));
    };

    const inscreverRPG = async (idRPG: string) => {
        try {
            await rpgService.inscreverRPG(idRPG);
            setIsInscrito(true);
            const novoJogador = usuario;
            if (novoJogador) {
                setRPG({
                    ...rpg,
                    jogadores: [...(rpg.jogadores ? rpg.jogadores : []), novoJogador],
                });

                salvarInscricao();


            }
        } catch (error) {
            console.log('Erro ao inscrever no rpg', error);
        }
    };

    const desinscreverRPG = async (idRPG: string) => {
        try {
            await rpgService.desinscreverRPG(idRPG);
            setIsInscrito(false);
            removerInscricao();


        } catch (error) {
            console.log('Erro ao cancelar inscrição', error);
        }
    };


    //Atualizar

    const atualizarRPG = async () => {
        try {
            if (updateRPG) {
                updateRPG.id = rpg.id;
                updateRPG.generos = generoRPGSelecionado;
                await rpgService.updateRPG(updateRPG).then(() => {
                    console.log('deu bom viado, ta atualizado')
                })
                onUpdate(updateRPG);
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
                        Atualizar Informações - {rpg.nome}
                    </DrawerHeader>
                    <DrawerBody>
                        <FormLabel>
                            Id
                        </FormLabel>
                        <Input type='number' defaultValue={rpg.id} onChange={(e) => {
                            setUpdateRPG({
                                ...updateRPG,
                                id: parseInt(e.target.value),
                            })
                        }} isDisabled/>

                        <FormLabel>
                            Nome:
                        </FormLabel>
                        <Input type='text' defaultValue={rpg.nome} onChange={(e) => {
                            setUpdateRPG({
                                ...updateRPG,
                                nome: e.target.value,
                            })
                        }} />

                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input type='text' defaultValue={rpg.descricao} onChange={(e) => {
                            setUpdateRPG({
                                ...updateRPG,
                                descricao: e.target.value,
                            })
                        }} />
                        <FormControl>
                            <FormLabel>Gêneros</FormLabel>
                            <Select
                                placeholder="Selecionar Gêneros"
                                isMulti
                                closeMenuOnSelect={false}
                                name='generoRPG'
                                defaultValue={generoRPGSelecionado.map(g=>{return {label:g.descricao, value: g}})}
                                options={generoRPG.map(g=>{return {label:g.descricao, value: g}})}
                                onChange={(event) => {
                                setGeneroRPGSelecionado(
                                    event.map((generoRPG) => generoRPG.value)
                                );
                                }}
                            />
                        </FormControl>
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="MESTRE">
                            <Button className="lilas-branco" onClick={atualizarRPG}> Atualizar</Button>
                        </ComponentePermissao>
                        {isInscrito === true ? <Button className="lilas-branco" onClick={() => desinscreverRPG(rpg.id!.toString())}>Cancelar Inscrição</Button> : <Button className="roxo-amarelo" onClick={() => inscreverRPG(rpg.id!.toString())}>Inscrever</Button>}


                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )

}




