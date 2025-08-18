import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";
import { ReactNode } from "react";

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
