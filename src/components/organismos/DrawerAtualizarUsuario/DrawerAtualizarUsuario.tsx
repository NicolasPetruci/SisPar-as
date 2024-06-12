import { useEffect, useState } from "react";
import Usuario from "../../../interface/Usuario";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import { useCargoService } from "../../../services/hooks/useCargoService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, } from "@chakra-ui/react";
import { formatarData, imprimeDataInput } from "../../../services/data";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import Cargo from "../../../interface/Cargo";
import Select from "react-select";



interface propsUsuario {
    isOpen: boolean;
    onClose: () => void;
    usuarioInterface: Usuario;
    onUpdate: (usuarioAtualizado: Usuario) => void;
}

export default function DrawerAtualizarUsuario({
    isOpen,
    onClose,
    usuarioInterface,
    onUpdate,
}: propsUsuario) {

    //declaração
    const [usuario, setUsuario] = useState<Usuario>(usuarioInterface);
    const [cargos, setCargos] = useState<Cargo[]>([]);


    const usuarioService = useUsuarioService();
    const cargosService = useCargoService();


    const nomeCargos = cargos.map((cargos) => {
        return {
            label: cargos.descricao,
            value: cargos.id,
            data: cargos,
        };
    });



    const [updateUsuario, setUpdateUsuario] = useState<Usuario>({
        nome: usuario ? usuario.nome : "",
        email: usuario ? usuario.email : "",
        telefone: usuario ? usuario.telefone : "",
        aniversario: usuario ? usuario.aniversario : new Date().toISOString(),
        cargos: usuario ? usuario.cargos : [],
    })

    const [cargosSelecionado, setCargosSelecionado] = useState<
        Cargo[]
    >([
        {
            id: 0,
            descricao: "",
        },
    ]);

    // buscar

    const buscarCargos = () => {
        try {
            cargosService.getAllCargo().then((cargos) => setCargos(cargos))
        } catch (error) {
            console.log('não obtive cargoss', error)

        }
    }

    //criarLista

    const criarListaCargos = (
        cargosSelecionado: Cargo[] | Cargo
    ) => {
        let novoCargos: Cargo[];

        if (cargosSelecionado instanceof Array) {
            novoCargos = cargosSelecionado.map(
                (cargos: Cargo) => {
                    return {
                        id: cargos.id,
                        descricao: cargos.descricao,

                    };
                }
            );
        } else {
            novoCargos = [
                {
                    id: cargosSelecionado.id,
                    descricao: cargosSelecionado.descricao,

                },
            ];
        }
        setUsuario({
            ...usuario,
            cargos: novoCargos.map((cargos) => {
                return cargos;
            }),
        });
    }


    //useEffect

    useEffect(() => {
        buscarCargos();
        criarListaCargos(cargos);
    }, []);



    //Atualizar

    const atualizarUsuario = async () => {
        try {
            if (updateUsuario) {
                updateUsuario.id = usuario.id;
                updateUsuario.cargos = cargosSelecionado;

                await usuarioService.updateUsuario(updateUsuario).then(() => {
                    console.log('deu bom manp, ta atualizado')
                })
                onUpdate(updateUsuario);
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
                        Atualizar Informações - {usuario.nome}
                    </DrawerHeader>
                    <DrawerBody>
                        <FormLabel>
                            Id
                        </FormLabel>
                        <Input type='number' defaultValue={usuario.id} onChange={(e) => {
                            setUpdateUsuario({
                                ...updateUsuario,
                                id: parseInt(e.target.value),
                            })
                        }} />

                        <FormLabel>
                            Nome:
                        </FormLabel>
                        <Input type='text' defaultValue={updateUsuario.nome} onChange={(e) => {
                            setUpdateUsuario({
                                ...updateUsuario,
                                nome: e.target.value,
                            })
                        }} />

                        <FormLabel>
                            email:
                        </FormLabel>
                        <Input type='text' defaultValue={updateUsuario.email} onChange={(e) => {
                            setUpdateUsuario({
                                ...updateUsuario,
                                email: e.target.value,
                            })
                        }} />

                        <FormLabel>
                            Telefone:
                        </FormLabel>
                        <Input type='text' defaultValue={updateUsuario.telefone} onChange={(e) => {
                            setUpdateUsuario({
                                ...updateUsuario,
                                telefone: e.target.value,
                            })
                        }} />

                        <FormLabel>Cargos Usuario:</FormLabel>

                        <Select
                            placeholder="Selecionar Generos"
                            isMulti
                            closeMenuOnSelect={false}
                            defaultValue={usuario.cargos?.map((cargos) => ({
                                label: cargos.descricao,
                                value: cargos.id,
                                data: cargos,
                            }))}
                            name='cargos'
                            options={nomeCargos}
                            onChange={(event) => {
                                setCargosSelecionado(
                                    event.map((cargos) => cargos.data)
                                );
                            }}
                        />
                        <FormLabel>
                            Aniversario
                        </FormLabel>
                        <Input type='datetime-local' defaultValue={imprimeDataInput(usuario.aniversario!)} onChange={(e) => {
                            const dataConvertida = formatarData(e.target.value)
                            setUpdateUsuario({
                                ...updateUsuario,
                                aniversario: dataConvertida,
                            })
                        }} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={atualizarUsuario}> Atualizar</Button>
                        </ComponentePermissao>



                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )

}




