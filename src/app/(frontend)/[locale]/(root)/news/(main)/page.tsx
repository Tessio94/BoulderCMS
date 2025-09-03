import { getPayload } from "payload";
import config from "@payload-config";
import React from "react";
import NewsPost from "@/components/NewsPost";
import { TransitionLink } from "@/components/TransitionLink";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const sParam = await searchParams;
  console.log("sParam", sParam);
  const currentPage = parseInt(sParam.page || "1", 10);
  const limit = 4;

  const { news, totalPages } = await getAllNews(currentPage, limit);

  console.log(news);
  console.log("totalPages", totalPages);
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

        {/* Pagination */}
        {/* <div className="mt-20 mb-30">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <a
                key={pageNum}
                href={`?page=${pageNum}`}
                className={`rounded px-3 py-1 ${
                  pageNum === currentPage
                    ? "bg-cyan-900 text-white"
                    : "bg-gray-200"
                }`}
              >
                {" "}
                {pageNum}
              </a>
            );
          })}
        </div> */}
        <div className="my-20 flex justify-center gap-3">
          {/* Prev button */}
          {currentPage > 1 ? (
            <TransitionLink
              href={`?page=${currentPage - 1}`}
              className="cursor-pointer rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50"
            >
              Prev
            </TransitionLink>
          ) : (
            <span className="cursor-not-allowed rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 opacity-50">
              Prev
            </span>
          )}

          <span className="px-4 py-2 text-cyan-900">
            Page {currentPage} of {totalPages}
          </span>

          {/* Next button */}
          {currentPage < totalPages ? (
            <TransitionLink
              href={`?page=${currentPage + 1}`}
              className="cursor-pointer rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50"
            >
              Next
            </TransitionLink>
          ) : (
            <span className="cursor-not-allowed rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 opacity-50">
              Next
            </span>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;

const getAllNews = async (page = 1, limit = 10) => {
  const payload = await getPayload({ config });

  const results = await payload.find({
    collection: "news",
    limit,
    page,
    sort: "-createdAt",
  });

  return {
    news: results.docs,
    totalPages: results.totalPages,
    totalDocs: results.totalDocs,
    currentPage: results.page,
  };
};
