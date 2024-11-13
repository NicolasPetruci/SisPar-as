import { useContext, useState } from "react";
import Filme from "../../interface/Filme";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useFilmeService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createFilme = async (filmeData: Filme) => {
        try {
            setLoading(true);
            const response = await api.post('/filme', filmeData, {
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

    const deleteFilme = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.delete(`/filme/${id}`, {
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

    const getAllFilme = async () => {
        try {
            setLoading(true);
            const response = await api.get('/filme', {
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

    const getFilme = async (id: string) => {
        try {
            setLoading(false);
            const response = await api.get(`/filme/${id}`, {
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

    const updateFilme = async (updatedData: Filme) => {
        try {
            setLoading(false);
            const response = await api.put(`/filme`, updatedData, {
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

    

    
    return {
        data,
        loading,
        error,
        createFilme,
        deleteFilme,
        getAllFilme,
        getFilme,
        updateFilme,
     
        
    }
}