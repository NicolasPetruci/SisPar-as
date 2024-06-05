import React, { useEffect, useState } from "react"
import { Navigate, PathRouteProps, Route } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { api } from "../services/apiService";


// type propsRotaData = RouteProps & {
//     cargo?: string;
// }

interface propsRotaData extends PathRouteProps {
    cargo?: string;
}

const PrivateRoute: (React.FC<propsRotaData>) = ({ cargo, ...rest }) => {
    const [permission, setPermission] = useState([] as string[])

    useEffect(() => {

        async function loadRoles() {
            const response = api.get('/cargo');
            const findRole = (await response).data.find((r: string) => r === cargo)
            setPermission(findRole);
        }

        loadRoles()
    }, [])






    const { userLogged } = useAuth();

    if (!userLogged()) {
        return <Navigate to='/' />
    }

    if (!cargo && userLogged()) {
        return <Route {...rest} />
    }

    return (
        permission ? <Route {...rest} /> : <Navigate to='/' />
    )

}

export default PrivateRoute;