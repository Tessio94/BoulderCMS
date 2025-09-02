import React from "react";
import { TransitionLink } from "./TransitionLink";
import Image from "next/image";
import { eventDateFormat } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import { News } from "@/payload-types";

type NewsPostProps = {
  post: News;
};

const NewsPost = ({ post }: NewsPostProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl lg:w-[45%] 2xl:w-[40%]">
      <TransitionLink
        href={`/news/${post.slug}`}
        type="post"
        className="flex h-full flex-col"
      >
        <div className="overflow-hidden">
          {post.newsImage ? (
            <Image
              className="h-[300px] w-full max-w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
              src={post.newsImage?.url}
              alt={post.newsImage?.alt}
              width={post.newsImage?.width}
              height={post.newsImage?.height}
            />
          ) : (
            <div className="bg-cards-dark/30 flex h-[300px] w-full items-center justify-center">
              <Image
                src="/image_placeholder.png"
                alt="Image not found"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
        <div className="group-hover:bg-cards-dark/60 bg-cards-dark/20 flex grow flex-col items-start gap-5 px-5 py-5 text-cyan-900 transition-all duration-300">
          <time>{eventDateFormat(post.createdAt)}</time>
          <p className="text-2xl">{post.title}</p>
          <p className="text-xl">{post.intro}</p>
          <button className="flex items-center gap-4 text-xl font-bold">
            Read more{" "}
            <FaArrowRight className="transition-all duration-300 group-hover:translate-x-[6px]" />
          </button>
        </div>
      </TransitionLink>
    </div>
  );
};

export default NewsPost;
