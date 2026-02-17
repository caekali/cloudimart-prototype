"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// export async function authenticate(
//   _: string | undefined,
//   formData: FormData
// ) {

//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Bad credentials";
//         case "CallbackRouteError":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }


export async function authenticateAction(prevState_: any | undefined, formData: FormData) {
  const data = Object.fromEntries(formData);
  const loginSchema = z
    .object({
      email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),
      password: z
        .string()
      // .regex(PASSWORD_REGEX, "Provide a stronger password")
      // .min(1, "Password is required")
      // .min(8, "Password must be at least 8 characters"),
    })
    .safeParse({ email: data.email, password: data.password });

  if (!loginSchema.success) {
    const errors = {};
    loginSchema.error.issues.forEach((issue) => {
      errors[issue.path[0]] = issue.message;
    });
    return { success: false, error: errors };
  }

  const router = useRouter();

  try {
    const res = await signIn("credentials", {
      ...formData,
      redirect: false, // prevent NextAuth default redirect
    });

    if (res?.error) {
      if (res.error === "CredentialsSignin") {
        return { success: false, message: "Bad credentials" };
      }
      return { success: false, message: "Something went wrong" };
    }

    // fetch session to get user info
    const session = await getSession();

    if (session?.user?.role) {
      switch (session.user.role) {
        case "admin":
          router.replace("/admin/dashboard");
          break;
        case "delivery":
          router.replace("/delivery/dashboard");
          break;
        default:
          router.replace("/"); // fallback
      }
    }

    return { success: true, message: "User logged in successfully" };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
