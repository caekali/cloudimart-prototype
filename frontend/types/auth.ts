import { User } from "./user";





export interface SigninResponse {
  user: User;
  token: string;
}


export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
