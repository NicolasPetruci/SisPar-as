import { useContext, useState } from "react";
import RPG from "../../interface/RPG";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useRPGService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createRPG = async (rpgData: RPG) => {
        try {
            setLoading(true);
            const response = await api.post('/rpg/cadastrar', rpgData, {
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

    const deleteRPG = async (rpgId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/rpg/excluir?id=${rpgId}`, {
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

    const getAllRPG = async () => {
        try {
            setLoading(true);
            const response = await api.get('/rpg', {
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

    const getRPG = async (rpgId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/rpg?id=${rpgId}`, {
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

    const updateRPG = async (updatedData: RPG) => {
        try {
            setLoading(false);
            const response = await api.put(`/rpg/atualizar`, updatedData, {
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
    const inscreverRPG = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.put(`/rpg/inscrever?id_rpg=${id}`, {
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

    const desinscreverRPG = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.put(`/rpg/desinscrever?id_rpg=${id}`, {
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

    return { createRPG, deleteRPG, getAllRPG, getRPG, updateRPG, inscreverRPG, desinscreverRPG, data, loading, error }
}