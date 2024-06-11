import { Button, Input } from "@chakra-ui/react";

import {
    FormLabel,
} from '@chakra-ui/react'
import { useCallback, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
                <FormLabel> Input Email </FormLabel>
                <Input type="email" onChange={e => setEmail(e.target.value)} />
                <FormLabel> Input senha</FormLabel>
                <Input type="password" onChange={e => setSenha(e.target.value)} />

                <Button type="submit"> Login</Button>
            </form>
        </>
    )
}