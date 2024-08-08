import { FormFieldDto, ProjectStatus } from "./common.model";

export interface createProjectDto{
  _id?: string;
  clientContactNumber: number;
  clientEmail: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: string;
  createdBy: string;
  category: string;
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
  

  export interface ProjectFormDto {
    _id: FormFieldDto<string>;
    projectName: FormFieldDto<string>;
    startDate: FormFieldDto<string>;
    endDate: FormFieldDto<string>;
    category: FormFieldDto<string>;
    status: FormFieldDto<string>;
    clientContactNumber: FormFieldDto<number>;
    clientEmail: FormFieldDto<string>;
    createdBy: FormFieldDto<string>;
  }
  
export interface Category{
    _id:string
    category:string
}
export interface CategoryFormDto{
     _id:FormFieldDto<string>
    category:FormFieldDto<string>
}

export interface FilterMap{
    _id:string
    name:string
    isSelect:boolean
}