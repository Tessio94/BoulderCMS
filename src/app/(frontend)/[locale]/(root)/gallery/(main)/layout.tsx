import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header2 />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
