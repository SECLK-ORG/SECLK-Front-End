import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."
import { loginPayloadDto, ResetPayload } from "../utilities/models";



const login = (payload:loginPayloadDto):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/users/signIn`,payload);
}

const resetPassword=(payload:ResetPayload): Promise<AxiosResponse<any>> =>{
    return axiosPrivateInstance.put(`/api/users/resetPassword`,payload);
}

const getAllUsers=():Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/users/all`);
}




export const UserService = {
    login,
    resetPassword,
    getAllUsers
}