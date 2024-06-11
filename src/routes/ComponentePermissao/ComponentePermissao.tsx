import { useEffect, useState } from "react";
import { api } from "../../services/apiService";
import React from "react";

interface propsComponentePermissao {
    cargo: string;
    children: JSX.Element;
}


const ComponentePermissao: (React.FC<propsComponentePermissao>) = ({ cargo, children }) => {
    const [permission, setPermission] = useState([] as string[])

    useEffect(() => {
        async function loadRoles() {


            const response = await api.get('/usuario/cargos');


            const findRole = response.data.some((c: string) => {
                cargo?.split(',').includes(c);
                return cargo.includes(c);
            });


            return setPermission(findRole)

        }


        loadRoles()
    }, [])

    return (
        <>
            {permission && children}
        </>
    )
}

export default ComponentePermissao;
