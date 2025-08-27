"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { TransitionLink } from "./TransitionLink";
import { useTranslations } from "next-intl";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const SubHeader = () => {
  const [showProfile, setShowProfile] = useState(false);

  const t = useTranslations("Header");

  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  let firstName: string | undefined;
  let lastName: string | undefined;
  let userName: string | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["user", pathname],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (data) {
    ({ userName, firstName, lastName } = data);
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/members/logout?allSessions=false", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      // Clear client state (react-query cache, etc.)
      // queryClient.clear(); // if you are using react-query
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
      // Redirect or refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="xsm:px-3 z-10 flex items-center justify-between border-b-2 border-cyan-500 bg-cyan-100 px-6 py-5 sm:px-10 lg:px-15 xl:mx-40">
      <button
        onClick={() => {
          router.back();
        }}
        className="group cursor-pointer rounded-full bg-cyan-900/30 p-2 transition-all duration-300 hover:bg-cyan-900/60"
      >
        <FaArrowLeft className="text-2xl text-cyan-900 transition-all duration-300 group-hover:text-amber-400" />
      </button>

      <div className="ml-auto flex items-center lg:ml-0 lg:gap-4 xl:gap-10">
        {firstName && lastName ? (
          <div className="xsm:mr-3 relative mr-6 sm:mr-10 lg:mr-0">
            <div
              onClick={() => setShowProfile((prev) => !prev)}
              className="group flex aspect-square h-[38px] cursor-pointer items-center justify-center rounded-full border-2 border-amber-400 bg-cyan-900 text-amber-400 transition-all duration-300 hover:border-cyan-900 hover:bg-amber-400 hover:text-cyan-900 sm:h-[52px] sm:text-2xl lg:h-[32px] lg:text-sm xl:h-[36px] xl:text-lg"
            >
              {`${firstName.slice(0, 1).toUpperCase()}${lastName.slice(0, 1).toUpperCase()}`}
            </div>
            {showProfile && (
              <div className="absolute top-[100%] right-0 z-20 flex flex-col rounded-xl bg-cyan-900 text-amber-400">
                <div className="cursor-pointer rounded-t-xl border-2 border-b-[1px] border-amber-400 px-10 py-3 transition-all duration-300 hover:border-cyan-900 hover:border-b-amber-400 hover:bg-amber-400 hover:text-cyan-900">
                  Results
                </div>
                <div className="cursor-pointer border-2 border-t-[1px] border-b-[1px] border-amber-400 px-10 py-3 transition-all duration-300 hover:border-cyan-900 hover:border-t-amber-400 hover:border-b-amber-400 hover:bg-amber-400 hover:text-cyan-900">
                  Events
                </div>
                <div
                  onClick={handleLogout}
                  className="cursor-pointer rounded-b-xl border-2 border-t-[1px] border-amber-400 px-10 py-3 duration-300 hover:border-cyan-900 hover:border-t-amber-400 hover:bg-amber-400 hover:text-cyan-900"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <TransitionLink
            type="i18n"
            className="my-text-stroke flex items-center gap-3 rounded-2xl bg-cyan-900/10 px-2 py-[1px] text-2xl font-extrabold text-cyan-900/90 transition-all duration-500 hover:bg-cyan-900/30 focus:bg-cyan-900/30 active:bg-cyan-900/30 xl:text-3xl"
            href="/login"
          >
            <Image
              src="/header/login.svg"
              alt="ikona za login"
              width={40}
              height={40}
              className="red"
            />
            {t("login")}
          </TransitionLink>
        )}
      </div>
    </header>
  );
};

export default SubHeader;
