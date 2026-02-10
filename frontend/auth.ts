import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config";
import { login } from "./api/auth";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await login(credentials.email as string, credentials.password as string);

                    if (res && res.user) {
                        return {
                            id: res.user.id,
                            email: res.user.email,
                            name: res.user.name,
                            token: res.token
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }

        }),
    ],
});

