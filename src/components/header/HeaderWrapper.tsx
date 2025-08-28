import React from "react";
import Header2 from "./Header2";
import { getUser } from "@/lib/serverFunctions/getUserAction";

const HeaderWrapper = async () => {
  const user = await getUser();

  //   console.log(user);

  return <Header2 user={user} />;
};

export default HeaderWrapper;
