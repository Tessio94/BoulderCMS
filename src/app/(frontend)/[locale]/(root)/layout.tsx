import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
