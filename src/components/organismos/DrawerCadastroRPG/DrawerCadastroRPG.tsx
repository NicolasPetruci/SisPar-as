import GeneroRPG from "../../../interface/GeneroRPG"
import RPG from "../../../interface/RPG"
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../../interface/Usuario.tsx";
import { useRPGService } from "../../../services/hooks/useRPGService";
import { useGeneroRPGService } from "../../../services/hooks/useGeneroRPGService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, Textarea } from "@chakra-ui/react";
import Select from 'react-select';
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import { imprimeDataInput, formatarData } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
interface propsRPGCadastro {
    isOpen: boolean;
    onClose: () => void;
}

export default function DrawerCadastroRPG({
    isOpen,
    onClose,

}: propsRPGCadastro) {
    const [rpg, setRPG] = useState<RPG>({
        nome: "",
        descricao: "",
        generos: [],
    });
    const [generoRPGSelecionado, setGeneroRPGSelecionado] = useState<GeneroRPG[]>([]);
    const [generoRPG, setGeneroRPG] = useState<GeneroRPG[]>([]);
    const [usuario, setUsuario] = useState<Usuario>()
    const rpgService = useRPGService();
    const generoRPGService = useGeneroRPGService();
    const usuarioService = useUsuarioService();

    const buscarGeneros = () => {
        try {
            generoRPGService.getAllGeneroRPG().then((generoRPG) => setGeneroRPG(generoRPG))
        } catch (error) {
            console.log('não obtive jogadores', error)

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
    //criarRPG

    const cadastrarRPG = () => {
        try {
            rpgService.createRPG({...rpg, generos: generoRPGSelecionado }).then((rpgCadastrado) => {
                console.log('RPG cadastrado')
            })
        } catch (error) {
            console.log('erro ao cadastrar rpg', error)
        }
    }

    //arrowfunctions

    const cadastroDadosRPG = (e: ChangeEvent<HTMLInputElement>) => {
        setRPG({
            ...rpg,
            [e.target.name]: e.target.value,
        });
    };

    const cadastroTempoRPG = (e: any) => {
        const dataConvertida = formatarData(e.target.value);
        setRPG({
            ...rpg,
            [e.target.name]: dataConvertida,
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
                        <Input name='nome' type='text' defaultValue={rpg.nome} onChange={cadastroDadosRPG} />

                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input name='descricao' type='text' defaultValue={rpg.descricao} onChange={cadastroDadosRPG} />
                        <FormControl>
                            <FormLabel>Gêneros</FormLabel>
                            <Select
                                placeholder="Selecionar Gêneros"
                                isMulti
                                closeMenuOnSelect={false}
                                name='generoRPG'
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
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={cadastrarRPG}> Cadastrar</Button>
                        </ComponentePermissao>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >


        </>
    )

}