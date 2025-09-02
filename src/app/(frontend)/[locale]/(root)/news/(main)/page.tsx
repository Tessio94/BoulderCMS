import { getPayload } from "payload";
import config from "@payload-config";
import React from "react";
import NewsPost from "@/components/NewsPost";

const Page = async () => {
  const news = await getAllNews();
  console.log(news);
  return (
    <main className="min-h-[calc(100vh-620px)] px-[20px] py-3 pt-[125px] sm:px-[50px] lg:px-[60px] xl:min-h-[calc(100vh-403px)] 2xl:px-[160px]">
      <div className="pt-15 pb-10">
        <h4 className="my-text-stroke relative mb-16 w-fit pt-7 text-3xl font-extrabold text-cyan-900">
          News:
        </h4>
        <div className="flex flex-wrap justify-between gap-y-16 md:px-24 lg:px-0">
          {news.map((post, i) => {
            return <NewsPost key={i} post={post} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Page;

const getAllNews = async () => {
  const payload = await getPayload({ config });

  const results = await payload.find({
    collection: "news",
  });

  return results.docs;
};
