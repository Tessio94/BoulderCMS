import { getUser } from "@/lib/serverFunctions/getUserAction";
import BackButton from "./BackButton";
import UserProfile from "./UserProfile";

const SubHeader = async () => {
  const user = await getUser();
  console.log("user", user);

  return (
    <header className="xsm:px-3 z-10 flex items-center justify-between border-b-2 border-cyan-500 bg-cyan-100 px-6 py-5 sm:px-10 lg:px-15 xl:mx-40">
      <BackButton />
      <UserProfile user={user} />
    </header>
  );
};

export default SubHeader;
