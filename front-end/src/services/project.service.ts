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

export const ProjectService = {
    createProject,
    getProjects,
    getProjectCountByStatus
}