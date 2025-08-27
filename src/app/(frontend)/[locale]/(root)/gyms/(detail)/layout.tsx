import SubFooter from "@/components/SubFooter";
import SubHeader from "@/components/SubHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SubHeader />
      {children}
      <SubFooter />
    </>
  );
};

export default layout;
