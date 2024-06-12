import { useContext, useState } from "react";
import GeneroRPG from "../../interface/GeneroRPG";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useGeneroRPGService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createGeneroRPG = async (generorpgData: GeneroRPG) => {
        try {
            setLoading(true);
            const response = await api.post('/rpg/genero/cadastrar', generorpgData, {
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

    const deleteGeneroRPG = async (generorpgId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/rpg/genero?id=${generorpgId}`, {
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

    const getAllGeneroRPG = async () => {
        try {
            setLoading(true);
            const response = await api.get('/rpg/genero', {
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

    const getGeneroRPG = async (generorpgId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/rpg/genero?id=${generorpgId}`, {
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

    const updateGeneroRPG = async (updatedData: GeneroRPG) => {
        try {
            setLoading(false);
            const response = await api.put(`/rpg/genero/atualizar`, updatedData, {
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

    return { createGeneroRPG, deleteGeneroRPG, getAllGeneroRPG, getGeneroRPG, updateGeneroRPG, data, loading, error }
}