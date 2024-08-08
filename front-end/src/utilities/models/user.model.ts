import { FormFieldDto, StateObjectDto } from "./common.model";

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