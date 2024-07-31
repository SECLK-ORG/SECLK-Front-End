import { FormFieldDto } from "./common.model";

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