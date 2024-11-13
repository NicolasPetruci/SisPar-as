import { useContext, useState } from "react";
import Meme from "../../interface/Meme";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useMemeService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createMeme = async (memeData: Meme) => {
        try {
            setLoading(true);
            const response = await api.post('/meme', memeData, {
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

    const deleteMeme = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/meme/${id}`, {
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

    const getAllMeme = async () => {
        try {
            setLoading(true);
            const response = await api.get('/meme', {
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

    const getMeme = async (id: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/meme/${id}`, {
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

    const updateMeme = async (updatedData: Meme) => {
        try {
            setLoading(false);
            const response = await api.patch(`/meme/${updatedData.id}`, updatedData, {
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

    return { createMeme, deleteMeme, getAllMeme, getMeme, updateMeme, data, loading, error }
}