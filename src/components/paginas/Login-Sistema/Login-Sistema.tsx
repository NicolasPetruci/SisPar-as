import { Button, Flex, Input } from "@chakra-ui/react";

import {
    FormLabel,
} from '@chakra-ui/react'
import { useCallback, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";

export default function LoginSistema() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signIn } = useAuth();

    const handleSubmit = useCallback(async (event: any) => {
        event.preventDefault();

        await signIn({ email, senha })
        navigate('/menu')

    }, [email, senha])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Flex className="preto-lilas" w='100vw' h='100vh' alignItems='center' justifyContent='center'>

                    <CaixaPadronizada bg='white' larguraCaixa='50%' alturaCaixa='50%' direcao="column" distancia='0px'>
                        <>

                            <FormLabel> Input Email </FormLabel>
                            <Input color='black' w='50%' type="email" onChange={e => setEmail(e.target.value)} />
                            <FormLabel> Input senha</FormLabel>
                            <Input color='black' w='50%' type="password" onChange={e => setSenha(e.target.value)} />
                            <Button className="preto-lilas" type="submit"> Login</Button>


                        </>
                    </CaixaPadronizada>


                </Flex>
            </form>

        </>
    )
}