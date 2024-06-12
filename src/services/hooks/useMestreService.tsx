import { useContext, useState } from "react";
import Mestre from "../../interface/Mestre";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useMestreService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();


    const getAllMestre = async () => {
        try {
            setLoading(true);
            const response = await api.get('/rpg/mestre', {
                headers: {
                    Authorization: `Bearer ${authContext.token.token}`
                }
            });
            setData(response.data);
            return response.data;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const getMestre = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/rpg/mestre/?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authContext.token.token}`
                }
            });
            setData(response.data);
            return response.data;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getMestreLoggado = async () => {
        try {
            setLoading(false);
            const response = await api.get(`/rpg/mestre-logado`, {
                headers: {
                    Authorization: `Bearer ${authContext.token.token}`
                }
            });
            setData(response.data);
            return response.data;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };




    return { getAllMestre, getMestreLoggado, getMestre, data, loading, error }
}