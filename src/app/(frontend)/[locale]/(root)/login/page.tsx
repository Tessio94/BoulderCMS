"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/lib/serverFunctions/loginAction";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

// const loginMember = async (formData: any) => {
//   const res = await fetch("/api/members/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: formData.email,
//       password: formData.password,
//     }),
//   });

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.errors?.[0].message || "Login falied");
//   }

//   return res.json();
// };

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();

  // const mutation = useMutation({
  //   mutationFn: loginMember,
  //   onSuccess: (data) => {
  //     console.log("Login:", data);
  //     alert("Login successful!");
  //   },
  //   onError: (error: any) => {
  //     console.error(error.message);
  //   },
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   mutation.mutate(formData);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await loginAction({ email, password });

      if (res?.user) {
        setSuccess(true);
        // redirect if you want:
        // router.push(`/${locale}/dashboard`);
        setLoading(false);
        router.push("/");
      } else {
        setError(t("invalidCredentials"));
      }
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen min-h-[1080px] w-full items-center justify-center bg-[url(/homepage/boulder_1920.jpg)] bg-cover bg-no-repeat shadow-2xl shadow-amber-400/40">
      <div className="relative w-[600px] max-w-[90%] rounded-2xl border-t-4 border-t-cyan-900 bg-gradient-to-b from-cyan-900/10 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md">
        {loading ? (
          <div className="relative h-[532px] w-full rounded-2xl bg-gradient-to-b from-cyan-900/10 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <h5 className="my-text-stroke relative mx-auto mb-16 w-fit pt-7 text-center text-3xl font-extrabold text-cyan-900 after:absolute after:top-[calc(100%+10px)] after:left-[50%] after:h-[5px] after:w-[20%] after:translate-x-[-50%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
              {t("heading")}
            </h5>

            <div className="flex justify-between px-3 sm:px-10">
              <Link
                href="/register"
                className="relative cursor-pointer text-cyan-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 hover:after:w-full"
              >
                {t("register")}
              </Link>
              <button className="relative cursor-pointer text-cyan-900 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-900 after:transition-all after:duration-500 hover:after:w-full">
                {t("help")}
              </button>
            </div>

            <div className="mt-5 px-3 pb-[80px] sm:px-10">
              <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col gap-5"
              >
                <input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password")}
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <button className="cursor-pointer rounded-2xl border-[2px] border-transparent bg-cyan-900 px-5 py-2 text-cyan-200 transition-all duration-500 hover:border-cyan-900 hover:bg-cyan-200 hover:text-cyan-900">
                  {loading ? "...loading" : t("login")}
                </button>

                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">...success</p>}
              </form>

              <div
                className={cn(
                  "flex flex-row gap-4 max-[480px]:flex-col",
                  locale === "de" ? "gap-4" : "sm:gap-20",
                )}
              >
                <button
                  className={cn(
                    locale === "de" ? "btn-social-de" : "btn-social",
                  )}
                >
                  <FaFacebook className="text-2xl" />
                  {t("facebook")}
                </button>
                <button
                  className={cn(
                    locale === "de" ? "btn-social-de" : "btn-social",
                  )}
                >
                  <FcGoogle className="text-2xl" />
                  {t("google")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
