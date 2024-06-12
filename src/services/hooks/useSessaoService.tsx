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
            const response = await api.post('/rpg/sessao/cadastrar', sessaoData, {
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

    const deleteSessao = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/rpg/sessao/excluir?id=${id}`, {
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

    const getAllSessao = async () => {
        try {
            setLoading(true);
            const response = await api.get('/rpg/sessao', {
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

    const getSessao = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/rpg/sessao/buscar?id_rpg=${id}`, {
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

    const updateSessao = async (updatedData: Sessao) => {
        try {
            setLoading(false);
            const response = await api.put(`/rpg/sessao/atualizar`, updatedData, {
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

    return { createSessao, deleteSessao, getAllSessao, getSessao, updateSessao, data, loading, error }
}