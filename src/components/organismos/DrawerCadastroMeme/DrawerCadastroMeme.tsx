import Meme from "../../../interface/Meme"
import { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../../interface/Usuario";
import { useMemeService } from "../../../services/hooks/useMemeService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import { imprimeDataInput, formatarData } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";

interface propsMemeCadastro {
    isOpen: boolean;
    onClose: () => void;
}

export default function DrawerCadastroMeme({
    isOpen,
    onClose,

}: propsMemeCadastro) {
    

    const buscarUsuario = () => {
        try {
            usuarioService.getUsuarioLogged().then((usuario) => setUsuario(usuario))
            setMeme({...meme, criador: usuario})

        } catch (error) {
            console.log('False tem usuarios', error)
        }
    }

    //useEffect

    useEffect(() => {
        buscarUsuario();

    }, []);

    //criarMeme

    const cadastrarMeme = () => {
        try {
            memeService.createMeme(meme).then(() => {
                console.log('Meme cadastrado')
                window.location.reload()
            })
        } catch (error) {
            console.log('erro ao cadastrar meme', error)
        }
    }

    //arrowfunctions

    const cadastroDadosMeme = (e: ChangeEvent<HTMLInputElement>) => {
        setMeme({
            ...meme,
            dataCriacao: formatarData(new Date().toISOString()),
            criador: usuario,
            [e.target.name]: e.target.value,
        });
    };

    const [usuario, setUsuario] = useState<Usuario>();
    const [meme, setMeme] = useState<Meme>({
        titulo: "",
        descricao: "",
        dataCriacao: formatarData(new Date().toISOString()),
        criador: {} as Usuario,
    });
    const memeService = useMemeService();
    const usuarioService = useUsuarioService();
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
                            Título:
                        </FormLabel>
                        <Input name='titulo' type='text' defaultValue={meme.titulo} onChange={cadastroDadosMeme} />

                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input name='descricao' type='text' defaultValue={meme.descricao} onChange={cadastroDadosMeme} />

                        </DrawerBody>
                    <DrawerFooter>

                        <Button className="lilas-branco" onClick={cadastrarMeme}> Cadastrar</Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer >


        </>
    )

}