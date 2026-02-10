import { cn } from "@/lib/utils";
import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  className?: string;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  error = null,
  className = "",
  ...props
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(
          "mt-1 block w-full px-3 py-2 border",
          error ? "border-red-500" : "border-gray-300",
          "rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
