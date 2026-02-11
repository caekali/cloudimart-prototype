import { auth } from "@/auth";
import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { ContactDetails } from "@/types/user";



export async function getContactDetails(): Promise<ContactDetails> {
    const session = await auth();
    const apiToken = session?.token;

    const res = await fetch(`${BASE_URL}/profile`, {
        headers: {
            'Authorization': `Bearer ${apiToken}`
        }
    });
    if (!res.ok) throw new Error('Failed to fetch user details');
    const json = (await res.json()) as ApiResponse<ContactDetails>

    if (!json.success || !json.data) {
        throw new Error(json.message || "Invalid API response")
    }
    return json.data

}
