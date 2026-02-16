import { register } from "@/api/auth";
import { ApiError } from "@/types/api_response";
import { RegisterFormData } from "@/types/auth";
import { z } from "zod";
import { da } from "zod/v4/locales";

export async function registerAction(_: any | undefined, formData: FormData) {
    const signUpValidation = validateSignupFormData(Object.fromEntries(formData))

    if (signUpValidation?.error) {
        return signUpValidation;
    }
    if (signUpValidation.success === true && signUpValidation.data) {
        try {
            const data = signUpValidation.data
            const res = await register({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            })
            return { success: true, message: "Account created" };

        } catch (error) {
            if (error instanceof ApiError) {
                if (error.errors) {
                    return {
                        success: false,
                        error: error.errors
                    };
                }
                return {
                    success: false,
                    message: error.message,
                };
            }
            return {
                success: false,
                message: "Something went wrong, try again",
            };
        }
    }


}

const signupSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
    name: z.string().trim().min(1, "First name is required"),
    phone: z
        .string()
        .trim()
        .regex(/^\d+$/, "Invalid phone number. Only numbers are allowed"),

})

function validateSignupFormData(formData: { [k: string]: FormDataEntryValue }) {
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
        const errors = {};
        result.error.issues.forEach((issue) => {
            errors[issue.path[0]] = issue.message;
        });
        return { success: false, error: errors };
    }

    return { success: true, data: result.data };
}