import { useEffect, useState } from "react";
import Meme from "../../../interface/Meme";
import { useMemeService } from "../../../services/hooks/useMemeService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { formatarData, imprimeDataInput } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import Usuario from "../../../interface/Usuario";


interface propsMeme {
    isOpen: boolean;
    onClose: () => void;
    memeInterface: Meme;
    onUpdate: (memeAtualizado: Meme) => void;
}

export default function DrawerAtualizarMeme({
    isOpen,
    onClose,
    memeInterface,
    onUpdate,
}: propsMeme) {

    //declaração
    const [meme, setMeme] = useState<Meme>(memeInterface);
    const [isInscrito, setIsInscrito] = useState(Boolean)
    const [usuario, setUsuario] = useState<Usuario>()
    const memeService = useMemeService();
    const usuarioService = useUsuarioService();


    const [updateMeme, setUpdateMeme] = useState<Meme>({
        titulo: meme ? meme.titulo : "",
        dataCriacao: meme ? meme.dataCriacao : new Date().toISOString(),
        descricao: meme ? meme.descricao : "",

    })

    // buscar

    const buscarUsuario = () => {
        try {
            usuarioService.getUsuarioLogged().then((usuario) => setUsuario(usuario))

        } catch (error) {
            console.log('False tem usuarios', error)
        }
    }

    //useEffect

    useEffect(() => {
        buscarUsuario();


    }, []);


    //Atualizar

    const atualizarMeme = async () => {
        try {
            if (updateMeme) {
                updateMeme.id = meme.id;

                await memeService.updateMeme(updateMeme).then(() => {
                    console.log('deu bom manp, ta atualizado')
                })
                onUpdate(updateMeme);
            }
        } catch (error) {
            console.log('deu ruim', error)
        }
    }

    console.log(meme)

    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Atualizar Informações
                    </DrawerHeader>
                    <DrawerBody>
                        <FormLabel>
                            Titulo:
                        </FormLabel>
                        <Input type='text' defaultValue={meme.titulo} onChange={(e) => {
                            setUpdateMeme({
                                ...updateMeme,
                                titulo: e.target.value,
                            })
                        }} />


                        <FormLabel>
                            Descrição:
                        </FormLabel>
                        <Input type='text' defaultValue={meme.descricao} onChange={(e) => {
                            setUpdateMeme({
                                ...updateMeme,
                                descricao: e.target.value,
                            })
                        }} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={atualizarMeme}> Atualizar</Button>
                        </ComponentePermissao>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )

}




