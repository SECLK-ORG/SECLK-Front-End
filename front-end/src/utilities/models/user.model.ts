import { FormFieldDto } from "./common.model";

export interface ResetFormDto{
    email: FormFieldDto<string>;
    password: FormFieldDto<string>;
    confirmPassword: FormFieldDto<string>;
    token:FormFieldDto<string>
}