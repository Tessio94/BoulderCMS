import { ReactNode } from "react";
import Footer from "@/components/Footer";
import HeaderWrapper from "@/components/header/HeaderWrapper";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderWrapper />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
