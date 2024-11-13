import { useContext, useState } from "react";
import Cinema from "../../interface/Cinema";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useCinemaService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createCinema = async (cinemaData: Cinema) => {
        try {
            setLoading(true);
            const response = await api.post('/cinema', cinemaData, {
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

    const deleteCinema = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.delete(`/cinema/${id}`, {
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

    const getAllCinema = async () => {
        try {
            setLoading(true);
            const response = await api.get('/cinema', {
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

    const getCinema = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.get(`/cinema/${id}`, {
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

    const updateCinema = async (updatedData: Cinema) => {
        try {
            setLoading(false);
            const response = await api.put(`/cinema`, updatedData, {
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

    const inscreverCinema = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.put(`/inscrever/${id}`, {
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

    const desinscreverCinema = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.put(`/desinscrever/${id}`, {
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

    const visualizarCinemas = async (dataInicial: string, dataFinal: string) => {
        try {
            setLoading(true);
            const response = await api.get(`/cinema/visualizar-cinemas?data_inicial=${dataInicial}&data_final=${dataFinal}`, {
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

    const listarParticipantesCinema = async (idCinema: number) => {
        try {
            setLoading(true);
            const response = await api.get(`/cinema/listar-participantes?id_cinema=${idCinema}`, {
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
        createCinema,
        deleteCinema,
        getAllCinema,
        getCinema,
        updateCinema,
        desinscreverCinema,
        inscreverCinema,
        listarParticipantesCinema,
        visualizarCinemas,
    }
}