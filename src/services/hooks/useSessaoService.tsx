import { useContext, useState } from "react";
import Sessao from "../../interface/Sessao";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useSessaoService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createSessao = async (sessaoData: Sessao) => {
        try {
            setLoading(true);
            const response = await api.post('/sessao', sessaoData, {
                headers: {
                    Authorization: `Bearer ${authContext.token}`
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

    const deleteSessao = async (sessaoId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/sessao/${sessaoId}`, {
                headers: {
                    Authorization: `Bearer ${authContext.token}`
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

    const getAllSessao = async () => {
        try {
            setLoading(true);
            const response = await api.get('/sessao', {
                headers: {
                    Authorization: `Bearer ${authContext.token}`
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

    const getSessao = async (sessaoId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/sessao/${sessaoId}`, {
                headers: {
                    Authorization: `Bearer ${authContext.token}`
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

    const updateSessao = async (sessaoId: number, updatedData: Sessao) => {
        try {
            setLoading(false);
            const response = await api.patch(`/sessao/${sessaoId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${authContext.token}`
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

    return { createSessao, deleteSessao, getAllSessao, getSessao, updateSessao, data, loading, error }
}