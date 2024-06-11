import { useContext, useState } from "react";
import Usuario from "../../interface/Usuario";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useUsuarioService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createUsuario = async (usuarioData: Usuario) => {
        try {
            setLoading(true);
            const response = await api.post('/usuario', usuarioData, {
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

    const deleteUsuario = async (usuarioId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/usuario/${usuarioId}`, {
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

    const getUsuarioLogged = async () => {
        try {
            setLoading(true);
            const response = await api.get('/usuario/login', {
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

    const getAllUsuario = async () => {
        try {
            setLoading(true);
            const response = await api.get('/usuario', {
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

    const getUsuario = async (Id: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/usuario/${Id}`, {
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

    const updateUsuario = async (Id: number, updatedData: Usuario) => {
        try {
            setLoading(false);
            const response = await api.patch(`/usuario/${Id}`, updatedData, {
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

    return { createUsuario, getUsuarioLogged, deleteUsuario, getAllUsuario, getUsuario, updateUsuario, data, loading, error }
}