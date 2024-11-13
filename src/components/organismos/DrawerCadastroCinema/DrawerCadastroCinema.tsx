
import Cinema from "../../../interface/Cinema"
import { ChangeEvent, useEffect, useState } from "react";
import { useCinemaService } from "../../../services/hooks/useCinemaService";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import Filme from "../../../interface/Filme";
import { imprimeDataInput, formatarData } from "../../../services/data";
import { useFilmeService } from "../../../services/hooks/useFilmeService";

interface propsCinemaCadastro {
    isOpen: boolean;
    onClose: () => void;
}

export default function DrawerCadastroCinema({
    isOpen,
    onClose,

}: propsCinemaCadastro) {
    const [cinema, setCinema] = useState<Cinema>({
        nome: "",
        dataHora: "",
    });

    const cinemaService = useCinemaService();
   


    //criarCinema

    const cadastrarCinema = () => {
        try {
            cinemaService.createCinema(cinema).then(() => {
                console.log('Cinema cadastrado')
            })
        } catch (error) {
            console.log('erro ao cadastrar cinema', error)
        }
    }

    //arrowfunctions

    const cadastroDadosCinema = (e: ChangeEvent<HTMLInputElement>) => {
        setCinema({
            ...cinema,
            [e.target.name]: e.target.value,
        });
    };

    const cadastroTempoCinema = (e: any) => {
        const dataConvertida = formatarData(e.target.value);
        setCinema({
            ...cinema,
            [e.target.name]: dataConvertida,
        });
    };

    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Atualizar Informações - {cinema.nome}
                    </DrawerHeader>
                    <DrawerBody>

                        <FormLabel>
                            Nome:
                        </FormLabel>
                        <Input name='nome' type='text' defaultValue={cinema.nome} onChange={cadastroDadosCinema} />

                        <FormLabel>
                            Data:
                        </FormLabel>
                        <Input name="dataHora" type='datetime-local' defaultValue={imprimeDataInput(cinema.dataHora!)} onChange={cadastroTempoCinema} />
                    </DrawerBody>
                    <DrawerFooter>

                        <Button className="lilas-branco" onClick={cadastrarCinema}> Cadastrar</Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer >


        </>
    )

}