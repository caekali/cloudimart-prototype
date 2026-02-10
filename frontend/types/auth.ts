import { ApiResponse } from "./api_response";
import { ContactDetails, User } from "./user";


export interface PasswordResetResponse {
  success: boolean;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}


export interface SigninResponse {
  user: User;
  token: string;
}
