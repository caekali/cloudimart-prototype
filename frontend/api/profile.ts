import { auth } from "@/auth";
import { BASE_URL } from "@/constants/base_url";
import { ApiError } from "@/types/api_response";
import { ContactDetails } from "@/types/user";
import { apiFetch } from "./client";



export async function getContactDetails(): Promise<ContactDetails> {
    const session = await auth();
    const apiToken = session?.token;

    const res = await apiFetch<ContactDetails>(`${BASE_URL}/profile`, {
        cache: "no-store",
    },
        apiToken
    )

    if (!res.data) {
        throw new ApiError(
            "User data missing in response",
            500
        );
    }

    return res.data

}
