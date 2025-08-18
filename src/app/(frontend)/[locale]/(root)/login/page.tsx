"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("Login");

  return (
    <div className="relative flex h-screen min-h-[1080px] w-full items-center justify-center bg-[url(/homepage/boulder_1920.jpg)] bg-cover bg-no-repeat shadow-2xl shadow-amber-400/40">
      <div className="w-[600px] max-w-[90%] rounded-2xl border-t-4 border-t-cyan-900 bg-gradient-to-b from-cyan-900/10 via-cyan-200/60 to-amber-400/50 shadow-2xl shadow-amber-400/40 backdrop-blur-md">
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
          <form className="mb-6 flex flex-col gap-5">
            <input placeholder={t("email")} className="input" />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                className="input"
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
              {t("login")}
            </button>
          </form>

          <div className="flex flex-row gap-4 max-[480px]:flex-col sm:gap-20">
            <button className="btn-social">
              <FaFacebook className="text-2xl" />
              {t("facebook")}
            </button>
            <button className="btn-social">
              <FcGoogle className="text-2xl" />
              {t("google")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
