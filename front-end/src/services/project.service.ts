import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."
import { createProjectDto, forgotPasswordPayload, loginPayloadDto, ResetPayload } from "../utilities/models";
import { get } from "http";


const createProject = async (project: createProjectDto): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.post(`/api/projects/create`, project, )
}

const getProjects = async (): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/projects/all`)
}

const getProjectCountByStatus = async (): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/projects/getProjectStatusCount`)
}
const deleteProject = async (projectId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.delete(`/api/projects/delete/${projectId}`)
}

const updateProject = async (project: createProjectDto): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.put(`/api/projects/update/${project._id}`, project)
}
export const ProjectService = {
    createProject,
    getProjects,
    getProjectCountByStatus,
    deleteProject,
    updateProject
}