"use client";

import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { authenticate } from "@/lib/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useActionState, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        Login to Cloudimart
      </h1>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
          disabled={isPending}
          error={null}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          disabled={isPending}
          error={null}
        />

        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <Button
          disabled={isPending}
          className={`w-full flex justify-center ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isPending ? (
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
              Logging In...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <Link
          href="/register"
          className="text-sm font-medium text-orange-600 hover:text-orange-500 block"
        >
          Don't have an account? register
        </Link>
      </div>
    </div>
  );
}
