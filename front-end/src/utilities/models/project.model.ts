import { FormFieldDto, ProjectStatus } from "./common.model";

export interface createProjectDto{
    projectName:string;
    startDate:string;
    endDate:string;
    status:ProjectStatus;
    clientContactNumber:string;
    clientEmail:string;
    paymentType:string;
    createdBy:string;
}


export interface Expense {
    date: Date;
    amount: number;
    description?: string;
    vendor?: string;
    invoiceNumber?: string;
  }
export interface Income {
    date: Date;
    amount: number;
    description?: string;
    source?: string;
  }
  export interface Project {
    _id: string;
    projectName: string;
    startDate: string;
    endDate: string;
    category: string;
    status: ProjectStatus;
    totalIncome: number;
    clientContactNumber: string;
    clientEmail: string;
    totalExpenses: number;
    employees: String[];
    createdBy: string;
    incomeDetails: Income[];
    expenseDetails: Expense[];
  }
  
  export interface ProjectStatusDto {
    total: number;
    Completed: number;
    'In-Progress': number;
    'On-Hold': number;
  }
  

  export interface ProjectDto {
    projectName: FormFieldDto<string>;
    startDate: FormFieldDto<string>;
    endDate: FormFieldDto<string>;
    status: FormFieldDto<ProjectStatus>;
    clientContactNumber: FormFieldDto<string>;
    clientEmail: FormFieldDto<string>;
    paymentType: FormFieldDto<string>;
    createdBy: FormFieldDto<string>;
  }
  
export interface Category{
    _id:string
    category:string
}
export interface CategoryDto{
     id:FormFieldDto<string>
    category:FormFieldDto<string>
}

export interface FilterMap{
    _id:string
    name:string
    isSelect:boolean
}