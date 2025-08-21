import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { ProjectProvider } from "@/context/ProjectContext";
import Spinner from "@/components/Spinner";
import { Toaster } from "sonner";

const sniglet = localFont({
  src: [
    {
      path: "/fonts/Sniglet-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Sniglet-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
});

const nunito = localFont({
  src: [
    {
      path: "/fonts/Nunito-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Nunito-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Nunito-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/Nunito-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/Nunito-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "/fonts/Nunito-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--nunito",
});

export const metadata: Metadata = {
  title: "Boulder app",
  description: "Boulder App – Find all climbing events near you.",
  icons: {
    icon: "/header/logo3.svg", // or .png, .svg
  },
  // description: "Boulder App – Finden Sie alle Kletter-Events in Ihrer Nähe.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${sniglet.className} ${nunito.variable} max-w-screen antialiased`}
      >
        <ProjectProvider>
          <Spinner />
          <Toaster position="top-center" />
          <ReactQueryProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ReactQueryProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
