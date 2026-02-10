"use client";
import React, { use, useState } from "react";

import { useRouter } from "next/navigation";
import FormField from "@/components/ui/form-field";
import Link from "next/link";
import Button from "@/components/ui/button";
import { register } from "@/api/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => password.length >= 6;

  const validatePhone = (phone: string) => {
    const re = /^\+?[0-9]{7,15}$/;
    return re.test(phone);
  };

  const validateName = (name: string) => name.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { name, email, password, phone } = formData;

    // Client-side validation
    if (!validateName(name)) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        setSuccess(result.message || "Account created successfully!");
        setFormData({ name: "", email: "", password: "", phone: "" });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        Create Your Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="name"
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="full name"
          required
          disabled={loading}
        />
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          required
          disabled={loading}
        />
        <FormField
          id="phone"
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="phone"
          required
          disabled={loading}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          required
          disabled={loading}
        />

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <Button
          disabled={loading}
          className={`w-full flex justify-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? (
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
