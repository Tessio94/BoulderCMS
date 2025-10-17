import LoginForm from "@/components/LoginForm";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import React from "react";

const Login = async () => {
  const user = await getUser();

  return <LoginForm user={user} />;
};

export default Login;
