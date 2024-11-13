
// import Filme from "../../../interface/Filme"
// import { ChangeEvent, useEffect, useState } from "react";
// import { useFilmeService } from "../../../services/hooks/useFilmeService";
// import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, FormLabel, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
// import { imprimeDataInput, formatarData } from "../../../services/data";


// interface propsFilmeCadastro {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export default function DrawerCadastroFilme({
//     isOpen,
//     onClose,

// }: propsFilmeCadastro) {
//     // const [filme, setFilme] = useState<Filme>({
        
        
//     // });

//     const filmeService = useFilmeService();
   


//     //criarFilme

//     const cadastrarFilme = () => {
//         try {
//             filmeService.createFilme(filme).then(() => {
//                 console.log('Filme cadastrado')
//             })
//         } catch (error) {
//             console.log('erro ao cadastrar filme', error)
//         }
//     }

//     //arrowfunctions

//     const cadastroDadosFilme = (e: ChangeEvent<HTMLInputElement>) => {
//         setFilme({
//             ...filme,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const cadastroTempoFilme = (e: any) => {
//         const dataConvertida = formatarData(e.target.value);
//         setFilme({
//             ...filme,
//             [e.target.name]: dataConvertida,
//         });
//     };

//     return (
//         <>
//             <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
//                 <DrawerContent>
//                     <DrawerCloseButton />
//                     <DrawerHeader>
//                         Atualizar Informações - {filme.nome}
//                     </DrawerHeader>
//                     <DrawerBody>

//                         <FormLabel>
//                             Nome:
//                         </FormLabel>
//                         <Input name='nome' type='text' defaultValue={filme.nome} onChange={cadastroDadosFilme} />

                        
//                     </DrawerBody>
//                     <DrawerFooter>

//                         <Button className="lilas-branco" onClick={cadastrarFilme}> Cadastrar</Button>

//                     </DrawerFooter>
//                 </DrawerContent>
//             </Drawer >


//         </>
//     )

// }