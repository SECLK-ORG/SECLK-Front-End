import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."
import { EmployeePayloadDto, forgotPasswordPayload, loginPayloadDto, ResetPayload } from "../utilities/models";



const login = (payload:loginPayloadDto):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/users/signIn`,payload);
}

const resetPassword=(payload:ResetPayload): Promise<AxiosResponse<any>> =>{
    return axiosPrivateInstance.put(`/api/users/resetPassword`,payload);
}

const forgotPassword=(payload:forgotPasswordPayload): Promise<AxiosResponse<any>> =>{  
    return axiosPrivateInstance.post(`/api/users/forgotPassword`,payload);
 } 
const getAllUsers=():Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/users/all`);
}

const searchUsers=(payload:any):Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/users/search?q=${payload}`);
}

const createUser=(payload:EmployeePayloadDto):Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/users`,payload);
}
const updateEmployeeDetail=(payload:EmployeePayloadDto):Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.put(`/api/users/${payload._id}`,payload);
}
const deleteEmployee=(id:string):Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.delete(`/api/users/${id}`);
}

export const UserService = {
    login,
    resetPassword,
    getAllUsers,
    forgotPassword,
    searchUsers,
    createUser,
    updateEmployeeDetail,
    deleteEmployee
}