"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import Toast from "@/components/sonner/Toast";
import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { FaFacebook } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9\s-]{7,20}$/, "Invalid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 6 characters")
      .regex(/[0-9]/, "Must contain at least one number"),
    repeatPassword: z.string(),
    terms: z.literal(true, {
      error: () => ({ message: "You must accept terms" }),
    }),
  })
  .required();

const registerMember = async (formData: any) => {
  const res = await fetch(`/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      termsAcceptedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.errors?.[0].message || "Registration falied");
  }

  return res.json();
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // const locale = useLocale();
  const t = useTranslations("Register");

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: registerMember,
    onSuccess: (data) => {
      console.log("Registered:", data);
      toast.custom((id) => (
        <Toast
          id={id}
          type="yes"
          title="You have successfully registered."
          description="Use the login form below to log in with your account."
        />
      ));
      router.push("/login");
    },
    onError: (error: any) => {
      console.error(error.message);
      toast.custom((id) => (
        <Toast
          id={id}
          type="not"
          title="Something went wrong."
          description="Please try again with correct informations."
        />
      ));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword: "Passwords do not match",
      }));
      return;
    }

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) formattedErrors[err.path[0].toString()] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});

    mutation.mutate(formData);
  };

  return (
    <div className="relative flex h-screen min-h-[1080px] w-full items-center justify-center bg-[url(/homepage/boulder_1920.jpg)] bg-cover bg-no-repeat shadow-2xl shadow-amber-400/40">
      <div className="mt-[100px] w-[600px] max-w-[90%] rounded-2xl border-t-4 border-t-cyan-900 bg-gradient-to-b from-cyan-900/10 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md">
        <h5 className="my-text-stroke relative mx-auto mb-16 w-fit pt-7 text-3xl font-extrabold text-cyan-900 after:absolute after:top-[105%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
          {t("heading")}
        </h5>

        <div className="flex justify-between px-3 sm:px-10">
          <Link
            href="/login"
            className="relative cursor-pointer text-cyan-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 hover:after:w-full"
          >
            {t("login")}
          </Link>
          <button className="relative cursor-pointer text-cyan-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 hover:after:w-full">
            {t("help")}
          </button>
        </div>

        <div className="mt-5 px-3 pb-[80px] sm:px-10">
          <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-5">
            <div>
              <div className="flex gap-3 sm:gap-7">
                <input
                  name="firstName"
                  placeholder={t("name")}
                  type="text"
                  className="input"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <input
                  name="lastName"
                  placeholder={t("lastName")}
                  type="text"
                  className="input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-red-600">{errors.firstName}</p>
              )}
              {errors.lastName && (
                <p className="mt-1 text-red-600">{errors.lastName}</p>
              )}
            </div>
            <div>
              <input
                name="userName"
                placeholder={t("username")}
                type="text"
                className="input"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <p className="mt-1 text-red-600">{errors.userName}</p>
              )}
            </div>
            <div>
              <input
                name="email"
                placeholder={t("email")}
                className="input"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                name="phoneNumber"
                placeholder={t("phone")}
                type="tel"
                className="input"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-red-600">{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password")}
                  className="input"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <MdVisibilityOff
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <MdVisibility
                    className="icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  name="repeatPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("repeatPassword")}
                  className="input"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <MdVisibilityOff
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <MdVisibility
                    className="icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.repeatPassword && (
                <p className="mt-1 text-red-600">{errors.repeatPassword}</p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <input
                  name="terms"
                  type="checkbox"
                  className="cursor-pointer"
                  id="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <label className="cursor-pointer text-cyan-900" htmlFor="terms">
                  {t("terms")}
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-red-600">{errors.terms}</p>
              )}
            </div>

            <button className="cursor-pointer rounded-2xl border-[2px] border-transparent bg-cyan-900 px-5 py-2 text-cyan-200 transition-all duration-500 hover:border-cyan-900 hover:bg-cyan-200 hover:text-cyan-900">
              {mutation.isLoading ? "..." : t("register")}
            </button>
          </form>

          {/* <div
            className={cn(
              "flex flex-row gap-4 max-[480px]:flex-col",
              locale === "de" ? "gap-4" : "sm:gap-20",
            )}
          >
            <button
              className={cn(locale === "de" ? "btn-social-de" : "btn-social")}
            >
              <FaFacebook className="text-2xl" />
              {t("facebook")}
            </button>
            <button
              className={cn(locale === "de" ? "btn-social-de" : "btn-social")}
            >
              <FcGoogle className="text-2xl" />
              {t("google")}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
