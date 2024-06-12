// import Cargos from "../../../interface/Cargos"
import Usuario from "../../../interface/Usuario"
import { ChangeEvent, useEffect, useState } from "react";

import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
// import { useCargosService } from "../../../services/hooks/useCargosService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormLabel, Input, Radio, RadioGroup, } from "@chakra-ui/react";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import { imprimeDataInput, formatarData } from "../../../services/data";
import Cargos from "../../../interface/Cargo";
import { useCargoService } from "../../../services/hooks/useCargoService";
import Select from "react-select";
import Cargo from "../../../interface/Cargo";


interface propsUsuarioCadastro {
    isOpen: boolean;
    onClose: () => void;
}

export default function DrawerCadastroUsuario({
    isOpen,
    onClose,

}: propsUsuarioCadastro) {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: "",
        email: "",
        telefone: "",
        aniversario: new Date().toISOString(),
        cargos: [],
        senha: "",
    });
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const usuarioService = useUsuarioService();
    const cargosService = useCargoService();

    const [cargosSelecionado, setCargosSelecionado] = useState<
        Cargos[]
    >([
        {
            id: 0,
            descricao: "",
        },
    ]);

    const nomeCargos = cargos.map((cargos) => {
        return {
            label: cargos.descricao,
            value: cargos.id,
            data: cargos,
        };
    });

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



    const buscarCargos = () => {
        try {
            cargosService.getAllCargo().then((cargos) => setCargos(cargos))
        } catch (error) {
            console.log('não obtive participantes', error)

        }
    }

    const buscarUsuario = () => {
        try {
            usuarioService.getAllUsuario().then((usuario) => setUsuario(usuario));
        } catch (error) {
            alert("Erro ao obter usuarios");

        }
    }



    //useEffect

    useEffect(() => {
        buscarCargos();
        buscarUsuario();
        criarListaCargos(cargos)
    }, []);

    //criarUsuario

    const cadastrarUsuario = () => {
        try {
            usuario.cargos = cargosSelecionado;
            usuarioService.createUsuario(usuario).then(() => {
                console.log('Usuario cadastrado')
                buscarUsuario();
            })


        } catch (error) {
            console.log('erro ao cadastrar usuario', error)
        }
    }


    //arrowfunctions

    const cadastroDadosUsuario = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const cadastroTempoUsuario = (e: any) => {
        const dataConvertida = e.target.value;
        setUsuario({
            ...usuario,
            [e.target.name]: dataConvertida,
        });
        console.log(dataConvertida)
    };


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
                            Nome:
                        </FormLabel>
                        <Input name='nome' type='text' onChange={cadastroDadosUsuario} />

                        <FormLabel>
                            Telefone:
                        </FormLabel>
                        <Input name='telefone' type='text' onChange={cadastroDadosUsuario} />

                        <FormLabel>
                            Email:
                        </FormLabel>
                        <Input name='email' type='text' onChange={cadastroDadosUsuario} />

                        <FormLabel>
                            Senha:
                        </FormLabel>
                        <Input name='senha' type='text' onChange={cadastroDadosUsuario} />


                        <FormLabel>Cargos Usuario:</FormLabel>
                        <Select
                            placeholder="Selecionar Cargos"
                            isMulti
                            closeMenuOnSelect={false}
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
                        <Input name="aniversario" type='datetime-local' onChange={cadastroTempoUsuario} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={cadastrarUsuario}> Cadastrar</Button>
                        </ComponentePermissao>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >


        </>
    )

}