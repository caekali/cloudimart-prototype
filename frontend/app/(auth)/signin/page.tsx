"use client";

import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Typed state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state on new attempt

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        switch (result.error) {
          case "CredentialsSignin":
            setError("Bad credentials");
            break;
          default:
            setError("Something went wrong. Please try again.");
        }
      } else if (result?.ok) {
        if (callbackUrl) {
          router.push(callbackUrl);
          return;
        }

        const session = await getSession();
        switch (session?.user?.role) {
          case "admin":
            router.push("/admin/");
            break;
          case "delivery_person":
            router.push("/delivery/deliveries/");
            break;
          default:
            router.push("/");
        }
        router.refresh(); 
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        Signin to Cloudimart
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}

        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
          // error={state?.error?.email}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          disabled={isLoading}
          // error={state?.error?.password}
        />

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <Button
          disabled={isLoading}
          className={`w-full flex justify-center ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing In...
            </span>
          ) : (
            "Signin"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <Link
          href="/signup"
          className="text-sm font-medium text-orange-600 hover:text-orange-500 block"
        >
          Don't have an account? signup
        </Link>
      </div>
    </div>
  );
}
