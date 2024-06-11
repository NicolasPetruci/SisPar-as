import { useContext, useState } from "react";
import Evento from "../../interface/Evento";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useEventoService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createEvento = async (eventoData: Evento) => {
        try {
            setLoading(true);
            const response = await api.post('/evento/cadastrar', eventoData, {
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

    const deleteEvento = async (eventoId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/evento/excluir/${eventoId}`, {
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

    const getAllEvento = async () => {
        try {
            setLoading(true);
            const response = await api.get('/evento', {
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

    const getEvento = async (eventoId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/evento/${eventoId}`, {
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

    const updateEvento = async (eventoId: number, updatedData: Evento) => {
        try {
            setLoading(false);
            const response = await api.patch(`/evento/atualizar/${eventoId}`, updatedData, {
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

    return { createEvento, deleteEvento, getAllEvento, getEvento, updateEvento, data, loading, error }
}