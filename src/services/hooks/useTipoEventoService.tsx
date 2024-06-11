import { useContext, useState } from "react";
import TipoEvento from "../../interface/TipoEvento";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useTipoEventoService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createTipoEvento = async (tipoeventoData: TipoEvento) => {
        try {
            setLoading(true);
            const response = await api.post('/evento/tipo/cadastrar', tipoeventoData, {
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

    const deleteTipoEvento = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/evento/tipo/excluir?id=${id}`, {
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

    const getAllTipoEvento = async () => {
        try {
            setLoading(true);
            const response = await api.get('/evento/tipo', {
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

    const getTipoEvento = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/evento/tipo?id=${id}`, {
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

    const updateTipoEvento = async (id: number, updatedData: TipoEvento) => {
        try {
            setLoading(false);
            const response = await api.patch(`/evento/tipo/atualizar?id=${id}`, updatedData, {
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

    return { createTipoEvento, deleteTipoEvento, getAllTipoEvento, getTipoEvento, updateTipoEvento, data, loading, error }
}