import { useContext, useState } from "react";
import Mestre from "../../interface/Mestre";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useMestreService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createMestre = async (mestreData: Mestre) => {
        try {
            setLoading(true);
            const response = await api.post('/mestre', mestreData, {
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

    const deleteMestre = async (mestreId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/mestre/${mestreId}`, {
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

    const getAllMestre = async () => {
        try {
            setLoading(true);
            const response = await api.get('/mestre', {
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

    const getMestre = async (mestreId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/mestre/${mestreId}`, {
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

    const updateMestre = async (mestreId: number, updatedData: Mestre) => {
        try {
            setLoading(false);
            const response = await api.patch(`/mestre/${mestreId}`, updatedData, {
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

    return { createMestre, deleteMestre, getAllMestre, getMestre, updateMestre, data, loading, error }
}