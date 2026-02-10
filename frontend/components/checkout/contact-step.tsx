import React, { useState, useEffect } from "react";
import { User, Phone, Home, CheckCircle, Mail } from "lucide-react";
import { ContactDetails } from "@/types/user";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";

interface ContactStepProps {
  initialContact: ContactDetails;
  onSaveContact: (contact: ContactDetails) => void;
  onBack: () => void;
  isActive: boolean;
  isCompleted: boolean;
}

export const ContactStep: React.FC<ContactStepProps> = ({
  initialContact,
  onSaveContact,
  onBack,
  isActive,
  isCompleted,
}) => {
  const [formData, setFormData] = useState<ContactDetails>(initialContact);
  const [errors, setErrors] = useState<Partial<ContactDetails>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactDetails, boolean>>
  >({});

  const validate = (data: ContactDetails) => {
    const newErrors: Partial<ContactDetails> = {};
    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(data.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!data.email.trim()) newErrors.email = "email is required";
    return newErrors;
  };

  useEffect(() => {
    setFormData(initialContact);
  }, [initialContact]);

  useEffect(() => {
    if (isActive) {
      setErrors(validate(formData));
    }
  }, [formData, isActive]);

  const handleChange = (field: keyof ContactDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof ContactDetails) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, phone: true, email: true });

    if (Object.keys(validationErrors).length === 0) {
      onSaveContact(formData);
    }
  };

  if (!isActive && !isCompleted) {
    return (
      <div className="bg-card p-6 rounded-xl border border-border opacity-50 pointer-events-none">
        <h3 className="text-lg font-bold text-muted-foreground">
          2. Contact Details
        </h3>
      </div>
    );
  }

  if (isCompleted && !isActive) {
    return (
      <div className="bg-card p-6 rounded-xl border border-border flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            2. Contact Details
            <CheckCircle className="w-5 h-5 text-green-500" />
          </h3>
          <p className="text-gray-600 mt-1 text-sm">
            {formData.name} • {formData.phone}
          </p>
          <p className="text-gray-500 text-xs">{formData.email}</p>
        </div>
        <button
          onClick={onBack}
          className="text-primary text-sm font-medium hover:underline"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border ring-2 ring-blue-50">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm">
          2
        </div>
        Contact Details
      </h3>

      <div className="space-y-4">
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
          <FormField
            id="collectorPhoneNumber"
            label="Full Name"
            type="text"
            value={formData.name}
            onBlur={() => handleBlur('name')}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="full name"
            required
            error={touched.name && errors.name ? errors.name : null}
            className="pl-10 pr-4 py-2"
          />
        </div>

        {/* email */}

        <div className="relative">
          <Mail className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
          <FormField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onBlur={() => handleBlur('email')}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="email"
            required
            error={touched.email && errors.email ? errors.email : null}
            className="pl-10 pr-4 py-2"
          />
        </div>

        {/* phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-8 w-5 h-5 text-gray-400" />
          <FormField
            id="phone"
            label="Phone"
            type="tel"
            value={formData.phone}
            onBlur={() => handleBlur('phone')}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="phone"
            required
            error={touched.phone && errors.phone ? errors.phone : null}
            className="pl-10 pr-4 py-2"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onBack} className="w-1/3">
            Back
          </Button>

          <Button onClick={handleSubmit} className="w-2/3">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
