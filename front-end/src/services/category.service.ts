import { AxiosResponse } from "axios";
import { axiosPrivateInstance } from ".";


// Create Category
const createCategory = async (category: { category: string }): Promise<AxiosResponse<any>> => {
    return await axiosPrivateInstance.post(`/api/categories/create`, category);
}

// Get All Categories
const getCategories = async (): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/categories/all`);
}

// Update Category
const updateCategory = async (id: string, category: { category: string }): Promise<AxiosResponse<any>> => {
    return await axiosPrivateInstance.put(`/api/categories/update/${id}`, category);
}

// Delete Category
const deleteCategory = async (id: string): Promise<AxiosResponse<void>> => {
    return await axiosPrivateInstance.delete(`/api/categories/delete/${id}`);
}

export const CategoryService = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
