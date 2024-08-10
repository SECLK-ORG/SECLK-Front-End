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
const createEmployeeDetailByProjectId = async (projectId: string, employeeDetail: any): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.post(`/api/projects/project/${projectId}/employeeDetails`, employeeDetail);
};
const updateEmployeeDetailByProjectId = async (projectId: string, employeeId: string, updatedEmployeeDetail: any): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.put(`/api/projects/project/${projectId}/employeeDetails/${employeeId}`, updatedEmployeeDetail);
};
const deleteEmployeeDetailByProjectId = async (projectId: string, employeeId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.delete(`/api/projects/project/${projectId}/employeeDetails/${employeeId}`);
};
const createIncomeDetailByProjectId = async (projectId: string, incomeDetail: any): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.post(`/api/projects/project/${projectId}/incomeDetails`, incomeDetail);
};
const updateIncomeDetailByProjectId = async (projectId: string, incomeId: string, updatedIncomeDetail: any): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.put(`/api/projects/project/${projectId}/incomeDetails/${incomeId}`, updatedIncomeDetail);
};
const deleteIncomeDetailByProjectId = async (projectId: string, incomeId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.delete(`/api/projects/project/${projectId}/incomeDetails/${incomeId}`);
};
const createExpenseDetailByProjectId = async (projectId: string, expenseDetail: any): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.post(`/api/projects/project/${projectId}/expenseDetails`, expenseDetail);
};
const updateExpenseDetailByProjectId = async (projectId: string, expenseId: string, updatedExpenseDetail: any): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.put(`/api/projects/project/${projectId}/expenseDetails/${expenseId}`, updatedExpenseDetail);
};
const deleteExpenseDetailByProjectId = async (projectId: string, expenseId: string): Promise<AxiosResponse<any[]>> => {
    return await axiosPrivateInstance.delete(`/api/projects/project/${projectId}/expenseDetails/${expenseId}`);
};




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
    createEmployeeDetailByProjectId,
    updateEmployeeDetailByProjectId,
    deleteEmployeeDetailByProjectId,
    createIncomeDetailByProjectId,
    updateIncomeDetailByProjectId,
    deleteIncomeDetailByProjectId,
    createExpenseDetailByProjectId,
    updateExpenseDetailByProjectId,
    deleteExpenseDetailByProjectId,
}