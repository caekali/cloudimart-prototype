import { BASE_URL } from "@/constants/base_url";
import { ApiError, ApiResponse } from "@/types/api_response";
import { RegisterFormData, SigninResponse } from "@/types/auth";
import { apiFetch } from "./client";

export async function signin(email: any, password: any): Promise<SigninResponse> {

    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
    });

    const res = await apiFetch<SigninResponse>(`${BASE_URL}/auth/signin/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })

    if (!res.data) {
        throw new Error("Missing user details")
    }

    return res.data
}



export async function signout(): Promise<any> {

}



export async function register(data: RegisterFormData): Promise<ApiResponse<void>> {
    // const formData = new FormData();
    // for (const key in data) {
    //     formData.append(key, data[key as keyof RegisterFormData]);
    // }

    const res = await apiFetch<void>(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data)
    });
    return res
}