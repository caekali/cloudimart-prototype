import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { RegisterFormData, RegisterResponse, SigninResponse } from "@/types/auth";

export async function login(email: any, password: any): Promise<SigninResponse> {

    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
    });

    const res = await fetch(`${BASE_URL}/auth/signin/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })

    if (!res.ok) {
        throw new Error(`Failed to authenticate`);
    }


    const json = (await res.json()) as ApiResponse<SigninResponse>;
    if (!json.success || !json.data) {
        throw new Error(json.message || "Invalid response");
    }

    return json.data

}



export async function logout(): Promise<any> {

}



export async function register(data: RegisterFormData): Promise<ApiResponse<null>> {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key as keyof RegisterFormData]);
    }

    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: formData
    });


    if (!res.ok) {
        throw new Error(`Failed to authenticate`);
    }

    const json = (await res.json()) as ApiResponse<null>;
    if (!json.success) {
        throw new Error(json.message || "Invalid response");
    }

    return json
}