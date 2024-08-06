import { AxiosResponse } from "axios";
import { axiosPrivateInstance } from ".";


// Create Position
const createPosition = async (position: { positions: string }): Promise<AxiosResponse<any>> => {
    return await axiosPrivateInstance.post(`/api/positions/create`, position);
}

// Get All Positions
const getPositions = async (): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/positions/all`);
}

// Update Position
const updatePosition = async (id: string, position: { positions: string }): Promise<AxiosResponse<any>> => {
    return await axiosPrivateInstance.put(`/api/positions/update/${id}`, position);
}

// Delete Position
const deletePosition = async (id: string): Promise<AxiosResponse<void>> => {
    return await axiosPrivateInstance.delete(`/api/positions/delete/${id}`);
}

export const PositionService = {
    createPosition,
    getPositions,
    updatePosition,
    deletePosition
}
