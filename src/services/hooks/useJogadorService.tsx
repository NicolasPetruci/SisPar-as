import { useContext, useState } from "react";
import Jogador from "../../interface/Jogador";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useJogadorService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createJogador = async (jogadorData: Jogador) => {
        try {
            setLoading(true);
            const response = await api.post('/jogador', jogadorData, {
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

    const deleteJogador = async (jogadorId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/jogador/${jogadorId}`, {
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

    const getAllJogador = async () => {
        try {
            setLoading(true);
            const response = await api.get('/jogador', {
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

    const getJogador = async (jogadorId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/jogador/${jogadorId}`, {
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

    const updateJogador = async (jogadorId: number, updatedData: Jogador) => {
        try {
            setLoading(false);
            const response = await api.patch(`/jogador/${jogadorId}`, updatedData, {
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

    return { createJogador, deleteJogador, getAllJogador, getJogador, updateJogador, data, loading, error }
}