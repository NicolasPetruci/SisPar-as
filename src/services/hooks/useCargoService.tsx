import { useContext, useState } from "react";
import Cargo from "../../interface/Cargo";
import { api } from "../apiService";
import { AuthContext } from "../../context/AuthContext";


export const useCargoService = () => {
    const authContext = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const createCargo = async (cargoData: Cargo) => {
        try {
            setLoading(true);
            const response = await api.post('/cargo', cargoData, {
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

    const deleteCargo = async (cargoId: number) => {
        try {
            setLoading(false);
            const response = await api.delete(`/cargo/${cargoId}`, {
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

    const getAllCargo = async () => {
        try {
            setLoading(true);
            const response = await api.get('/cargo', {
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

    const getCargo = async (cargoId: number) => {
        try {
            setLoading(false);
            const response = await api.get(`/cargo/${cargoId}`, {
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

    const updateCargo = async (cargoId: number, updatedData: Cargo) => {
        try {
            setLoading(false);
            const response = await api.patch(`/cargo/${cargoId}`, updatedData, {
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

    return { createCargo, deleteCargo, getAllCargo, getCargo, updateCargo, data, loading, error }
}