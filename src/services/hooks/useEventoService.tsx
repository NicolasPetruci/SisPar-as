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

    const deleteEvento = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.delete(`/evento/excluir?id=${id}`, {
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

    const getAllEvento = async () => {
        try {
            setLoading(true);
            const response = await api.get('/evento', {
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

    const getEvento = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.get(`/evento?id=${id}`, {
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

    const updateEvento = async (updatedData: Evento) => {
        try {
            setLoading(false);
            const response = await api.put(`/evento/atualizar`, updatedData, {
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

    const inscreverEvento = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.put(`/evento/inscrever?id_evento=${id}`, {
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

    const desinscreverEvento = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.put(`/evento/desinscrever?id_evento=${id}`, {
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

    const visualizarEventos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/evento/visualizar-eventos', {
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

    return {
            data,
            loading,
            error,
            createEvento,
            deleteEvento,
            getAllEvento,
            getEvento,
            updateEvento,
            desinscreverEvento,
            inscreverEvento,
            visualizarEventos,
            }
}