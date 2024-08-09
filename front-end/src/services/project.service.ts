import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."
import { createProjectDto } from "../utilities/models";


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
const getProjectById = async (projectId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/projects/getProjectById/${projectId}`)
}
const getIncomeDetailsByProjectId=async (projectId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/projects/project/${projectId}/incomeDetails`)
}
const getExpenseDetailsByProjectId=async (projectId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/projects/project/${projectId}/expenseDetails`)
}
const getEmployeeDetailsByProjectId=async (projectId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.get(`/api/projects/project/${projectId}/employeeDetails`)
}

export const ProjectService = {
    createProject,
    getProjects,
    getProjectCountByStatus,
    deleteProject,
    updateProject,
    getProjectById,
    getIncomeDetailsByProjectId,
    getExpenseDetailsByProjectId,
    getEmployeeDetailsByProjectId,
}