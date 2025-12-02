"use client";

import { LinkProps } from "next/link";
import { Link as TranslateLink } from "@/i18n/navigation";
import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProjectInfo } from "@/context/ProjectContext";

interface TransitionLinkProps extends LinkProps {
  type?: string;
  children: ReactNode;
  href: string;
  className?: string;
}

type PathKey =
  | "home"
  | "events"
  | "gyms"
  | "gallery"
  | "login"
  | "register"
  | "impressum"
  | "privacyPolicy";

type AllPathnames = Record<PathKey, [string, string]>;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  type = "link",
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const { setShowSpinner } = useProjectInfo();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allPathnames: AllPathnames = {
    home: ["/", "/de"],
    events: ["/events", "/de/events"],
    gyms: ["/gyms", "/de/gyms"],
    gallery: ["/gallery", "/de/galerie"],
    login: ["/login", "/de/login"],
    register: ["/register", "/de/registrieren"],
    impressum: ["/impressum", "/de/impressum"],
    privacyPolicy: ["/privacy-policy", "/de/datenschutzerklärung"],
  };

  let newPathname: PathKey;

  if (pathname === "/" || pathname === "/de") {
    newPathname = "home";
  } else if (pathname === "/events" || pathname === "/de/events") {
    newPathname = "events";
  } else if (pathname === "/gyms" || pathname === "/de/gyms") {
    newPathname = "gyms";
  } else if (pathname === "/gallery" || pathname === "/de/galerie") {
    newPathname = "gallery";
  } else if (pathname === "/login" || pathname === "/de/login") {
    newPathname = "login";
  } else if (pathname === "/register" || pathname === "/de/registrieren") {
    newPathname = "register";
  } else if (pathname === "/impressum" || pathname === "/de/impressum") {
    newPathname = "impressum";
  } else if (
    pathname === "/privacy-policy" ||
    pathname === "/de/datenschutzerklärung"
  ) {
    newPathname = "privacyPolicy";
  }

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (
      newPathname &&
      (allPathnames[newPathname][0] + searchParams.toString() === href ||
        allPathnames[newPathname][1] + searchParams.toString() === href)
    ) {
      setShowSpinner(true);
      await sleep(300);
      router.push(href);
      setShowSpinner(false);
      return; // don't trigger spinner for same link
    }

    setShowSpinner(true);

    await sleep(300);

    router.push(href);
  };

  return type === "i18n" ? (
    // @ts-expect-error translateLink type narrower than next/link’s Link type
    <TranslateLink onClick={handleTransition} href={href} {...props}>
      {children}
    </TranslateLink>
  ) : (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
