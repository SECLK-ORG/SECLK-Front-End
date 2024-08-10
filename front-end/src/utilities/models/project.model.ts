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
    _id: string
    category: string;
    date: string;
    amount: string;
    description?: string;
    vendor?: string;
    invoiceNumber?: string;
  }
export interface Income {
    _id: string;
    invoiceNumber: string;
    date: string;
    amount: string;
    description?: string;
    receivedBy: string;
  }

  export  interface employee{
    _id:string
    employeeID:string
    employeeName:string
    email:string
    position:string
    projectStartedDate:string
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

export interface IncomeFormDto {
  amount: FormFieldDto<string>;
  description: FormFieldDto<string>;
  receivedBy: FormFieldDto<string>;
  date: FormFieldDto<string>;
}
export interface ExpenseFormDto {
  category: FormFieldDto<string>;
  vendor: FormFieldDto<string>;
  amount: FormFieldDto<string>;
  description: FormFieldDto<string>;
  invoiceNumber: FormFieldDto<string>;
  date: FormFieldDto<string>;
}
export interface EmployeeFormDto {
  _id: FormFieldDto<string>;
  employeeID: FormFieldDto<string>;
  employeeName: FormFieldDto<string>;
  email: FormFieldDto<string>;
  position: FormFieldDto<string>;
  projectStartedDate: FormFieldDto<string>;
}

export interface EmployeePayload {
  employeeID: string;
  employeeName: string;
  email: string;
  position: string;
  projectStartedDate: string;
}
export interface IncomePayload {
  _id?: string;
  invoiceNumber?: string;
  amount: string;
  description: string;
  receivedBy: string;
  date: string;
}
export interface ExpensePayload {
  _id?: string;
  category: string;
  amount: number;
  description: string;
  vendor: string;
  date: string;
}

