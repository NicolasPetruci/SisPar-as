import React, { useEffect, useState } from "react"
import { Navigate, PathRouteProps, Route } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/apiService";


// type propsRotaData = RouteProps & {
//     cargo?: string;
// }

interface propsRotaData extends PathRouteProps {
    cargo?: string;
    children: JSX.Element;
}

const PrivateRoute: (React.FC<propsRotaData>) = ({ cargo, children }) => {
    const [permission, setPermission] = useState([] as string[])

    useEffect(() => {
        async function loadRoles() {
            const response = api.get('/cargo');
            const findRole = (await response).data.some((c: string) => cargo?.split(',').includes(c))
            setPermission(findRole);
        }

        loadRoles()
    }, [])

    const { userLogged } = useAuth();

    if (!userLogged()) {
        return <Navigate to='/' />
    }

    if (!cargo && userLogged()) {
        return children;
    }

    return (
        permission ? children : <Navigate to='/' />
    )

}

export default PrivateRoute;