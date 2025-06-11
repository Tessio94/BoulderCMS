import Cards from "./Cards";
import Competition from "./Competition";
import LoginBanner from "./LoginBanner";

const Content = () => {
  return (
    <main className="relative bg-cyan-200/10 pt-[120px]">
      <Cards />
      <Competition />
      <LoginBanner />
    </main>
  );
};

export default Content;
