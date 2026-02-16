"use client";
import React, { use, useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import FormField from "@/components/ui/form-field";
import Link from "next/link";
import Button from "@/components/ui/button";
import { registerAction } from "@/lib/actions/signup-action";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [state, formAction, isPending] = useActionState(
    registerAction,
    undefined,
  );

  useEffect(() => {
    if (state?.success === true && state?.error === undefined) {
      setTimeout(() => {
        router.push(`/login?signedUp=true`);
      }, 1000);
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        Create Your Account
      </h1>

      <form action={formAction} className="space-y-6">
        <FormField
          id="name"
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="full name"
          required
          error={state?.error?.name}
        />
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          required
          error={state?.error?.email}
        />
        <FormField
          id="phone"
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="phone"
          required
          error={state?.error?.firstname}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          required
          error={state?.error?.password}
        />

        {state?.success === false && state?.message && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{state?.message}</span>
          </div>
        )}
        {state?.success === true && state?.message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{state?.message}</span>
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
              Registering...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-orange-600 hover:text-orange-500"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
