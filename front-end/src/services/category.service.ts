import { AxiosResponse } from "axios";
import { axiosPrivateInstance } from ".";


const createCategory = async (category: { category: string }): Promise<AxiosResponse<any>> => {
    return await axiosPrivateInstance.post(`/api/categories/create`, category);
}

const getCategories = async (): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/categories/all`);
}

const updateCategory = async (id: string, category: { category: string }): Promise<AxiosResponse<any>> => {
    return await axiosPrivateInstance.put(`/api/categories/update/${id}`, category);
}

const deleteCategory = async (id: string): Promise<AxiosResponse<void>> => {
    return await axiosPrivateInstance.delete(`/api/categories/delete/${id}`);
}

export const CategoryService = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
