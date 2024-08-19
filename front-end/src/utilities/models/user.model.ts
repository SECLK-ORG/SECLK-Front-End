import { FormFieldDto, StateObjectDto } from "./common.model";
import { userList } from "./project.model";

export interface ResetFormDto{
    email: FormFieldDto<string>;
    password: FormFieldDto<string>;
    confirmPassword: FormFieldDto<string>;
    token:FormFieldDto<string>
}

export interface ResetPayload{
    email:string
    password:string
    token:string
}
export interface forgotPasswordPayload{
    email:string
}


export interface  loginPayloadDto{
    email:string
    password:string
}
export interface  loginFormDto{
    email: FormFieldDto<string>;
    password: FormFieldDto<string>;
}
 export interface userData{
    email:string
    name:string
    role:string
    userId:string
 }


 export  interface UserStateDto {
    login:StateObjectDto<any>
  }


  export interface  Positions{
    _id:string
    positions:string
  }
  export interface PositionFormDto{
    _id:FormFieldDto<string>
    position:FormFieldDto<string>
  }

  export interface Employee {
    _id:string
    name: string;
    email: string;
    startDate: string;
    contactNumber: string;
    position: string;
    status: 'Active' | 'Inactive';
    workLocation: string;
    role: string;
  }

  export interface createEmployeeFormDto{
    _id:FormFieldDto<string>
    name:FormFieldDto<string>
    email:FormFieldDto<string>
    startDate:FormFieldDto<string>
    contactNumber:FormFieldDto<string>
    position:FormFieldDto<string>
    status:FormFieldDto<string>
    workLocation: FormFieldDto<string>;  
    role: FormFieldDto<string>;
  }

export interface EmployeePayloadDto{
_id?:string
name:string
email:string
startDate:string
contactNumber:string
position:string
status:string
workLocation:string
role:string
totalPaidAmount?:string
}

export interface PaymentHistory {
  _id:string
  employeeID: any;
  projectId: {
    _id:string,
    projectName:string
  };
  category: string;
  amount: string;
  description: string;
  invoiceNumber: string;
  date: string;
  expenseId: string;
}

export interface PaymentFormDto {
  project:FormFieldDto<ProjectByUser>;
  category: FormFieldDto<string>;
  amount: FormFieldDto<string>;
  description: FormFieldDto<string>;
  invoiceNumber: FormFieldDto<string>;
  date: FormFieldDto<string>;
  employeeID: FormFieldDto<userList>;
  vendor:FormFieldDto<string>;
}


export interface ProjectByUser {
  _id:string
  projectName: string;
  position: string;
  projectStartedDate: string;
}

