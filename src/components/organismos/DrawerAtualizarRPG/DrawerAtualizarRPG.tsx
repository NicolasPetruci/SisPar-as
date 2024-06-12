import { useEffect, useState } from "react";
import RPG from "../../../interface/RPG";
import GeneroRPG from "../../../interface/GeneroRPG";
import { useRPGService } from "../../../services/hooks/useRPGService";
import { useGeneroRPGService } from "../../../services/hooks/useGeneroRPGService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
    const [generoRPGSelecionado, setGeneroRPGSelecionado] = useState<
        GeneroRPG[]
    >([
        {
            id: 0,
            descricao: "",
        },
    ]);
    const [generoRPG, setGeneroRPG] = useState<GeneroRPG[]>([]);
    const [usuario, setUsuario] = useState<Usuario>()
    const rpgService = useRPGService();
    const generoRPGService = useGeneroRPGService();
    const usuarioService = useUsuarioService();


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
        criarListaGeneros(generoRPG);
        console.log(rpg.generos)
    }, []);

    const criarListaGeneros = (generosSelecionados: GeneroRPG[] | GeneroRPG) => {

        let novoGenero: GeneroRPG[];

        if (generosSelecionados instanceof Array) {
            novoGenero = generosSelecionados.map(
                (genero: GeneroRPG) => {
                    return {
                        id: genero.id,
                        descricao: genero.descricao
                    }
                }
            )
        } else {
            novoGenero = [
                {
                    id: generosSelecionados.id,
                    descricao: generosSelecionados.descricao,
                }
            ]
        }
        setRPG({
            ...rpg,
            generos: novoGenero.map((genero) => {
                return genero;
            })
        })

    }






    //Atualizar

    const atualizarRPG = async () => {
        try {
            if (updateRPG) {
                updateRPG.id = rpg.id;
                updateRPG.generos = generoRPGSelecionado;
                await rpgService.updateRPG(updateRPG).then(() => {
                    console.log('deu bom manp, ta atualizado')
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
                        }} isDisabled />

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

                        <FormLabel>Gêneros</FormLabel>
                        <Select
                            placeholder="Selecionar Gêneros"
                            isMulti
                            closeMenuOnSelect={false}
                            defaultValue={generoRPG?.map((generos) => ({
                                label: generos.descricao,
                                value: generos.id,
                                data: generos,
                            }))}
                            options={nomeGeneros}
                            onChange={(event) => {
                                setGeneroRPGSelecionado(
                                    event.map((genero) => genero.data)
                                );
                                console.log(generoRPG)
                            }}
                        />

                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="MESTRE,">
                            <Button className="lilas-branco" onClick={atualizarRPG}> Atualizar</Button>
                        </ComponentePermissao>



                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )





}
