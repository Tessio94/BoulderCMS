import { ReactNode } from "react";
// import config from "@payload-config";
// import { getPayload } from "payload";
// import { headers as getHeaders } from "next/headers";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";

const Layout = async ({ children }: { children: ReactNode }) => {
  // const payload = await getPayload({ config });
  // const headers = await getHeaders();
  // const { user, permissions } = await payload.auth({ headers });

  // let firstName: string | undefined;
  // let lastName: string | undefined;
  // let userName: string | undefined;

  // if (user) {
  //   console.log(user);
  //   console.log("data", permissions);

  //   ({ firstName, lastName, userName } = user);
  // }
  // console.log(firstName);
  return (
    <>
      <Header2 />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
