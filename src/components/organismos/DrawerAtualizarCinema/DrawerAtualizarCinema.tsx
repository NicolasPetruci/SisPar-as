import { useEffect, useState } from "react";
import Cinema from "../../../interface/Cinema";

import { useCinemaService } from "../../../services/hooks/useCinemaService";

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormControl, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { formatarData, imprimeDataInput } from "../../../services/data";
import { useUsuarioService } from "../../../services/hooks/useUsuarioService";
import ComponentePermissao from "../../../routes/ComponentePermissao/ComponentePermissao";
import Usuario from "../../../interface/Usuario";


interface propsCinema {
    isOpen: boolean;
    onClose: () => void;
    cinemaInterface: Cinema;
    onUpdate: (cinemaAtualizado: Cinema) => void;
}

export default function DrawerAtualizarCinema({
    isOpen,
    onClose,
    cinemaInterface,
    onUpdate,
}: propsCinema) {

    //declaração
    const [cinema, setCinema] = useState<Cinema>(cinemaInterface);
   
    
    
    const cinemaService = useCinemaService();
  


    const [updateCinema, setUpdateCinema] = useState<Cinema>({
        nome: cinema ? cinema.nome : "",
        dataHora: cinema ? cinema.dataHora : new Date().toISOString(),
       

    })

    

    //Atualizar

    const atualizarCinema = async () => {
        try {
            if (updateCinema) {
                updateCinema.id = cinema.id;

                await cinemaService.updateCinema(updateCinema).then(() => {
                    console.log('deu bom manp, ta atualizado')
                })
                onUpdate(updateCinema);
            }
        } catch (error) {
            console.log('deu ruim', error)
        }
    }

    console.log(cinema)

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
                            Id
                        </FormLabel>
                        <Input type='number' defaultValue={cinema.id} onChange={(e) => {
                            setUpdateCinema({
                                ...updateCinema,
                                id: parseInt(e.target.value),
                            })
                        }} />

                        <FormLabel>
                            Nome:
                        </FormLabel>
                        <Input type='text' defaultValue={cinema.nome} onChange={(e) => {
                            setUpdateCinema({
                                ...updateCinema,
                                nome: e.target.value,
                            })
                        }} />
                        
                        <FormLabel>
                            Data:
                        </FormLabel>
                        <Input type='datetime-local' defaultValue={imprimeDataInput(cinema.dataHora!)} onChange={(e) => {
                            const dataConvertida = formatarData(e.target.value)
                            setUpdateCinema({
                                ...updateCinema,
                                dataHora: dataConvertida,
                            })
                        }} />
                    </DrawerBody>
                    <DrawerFooter>
                        <ComponentePermissao cargo="ADM,DONO">
                            <Button className="lilas-branco" onClick={atualizarCinema}> Atualizar</Button>
                        </ComponentePermissao>
                        


                    </DrawerFooter>
                </DrawerContent>
            </Drawer >

        </>
    )

}




