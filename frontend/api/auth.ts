import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { SigninResponse } from "@/types/auth";

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

export async function register(name: string, email: string, phone: string, password: string): Promise<any> {

}

export async function logout(): Promise<any> {

}