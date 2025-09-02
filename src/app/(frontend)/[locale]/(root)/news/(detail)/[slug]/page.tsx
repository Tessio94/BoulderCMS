import React from "react";
import { getPayload } from "payload";
import { cache } from "react";
import config from "@payload-config";
import Image from "next/image";
import { RenderHTML } from "@/components/RenderHTML";
import { EventGallery } from "@/components/EventGallery";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const post = await queryPostsBySlug({ slug });

  return (
    <main className="xsm:px-3 flex min-h-[calc(100vh-187px)] flex-col gap-16 px-6 py-10 pb-20 shadow-xl shadow-cyan-500/50 sm:px-10 lg:px-15 xl:mx-40">
      <div>
        <h2 className="my-text-stroke2 relative w-fit text-3xl font-extrabold text-amber-400 text-shadow-cyan-900 text-shadow-lg after:absolute after:top-[110%] after:left-0 after:h-[5px] after:w-[20%] after:rounded-2xl after:border-[1px] after:border-cyan-900 after:bg-amber-400 after:content-['']">
          {post.title}
        </h2>
      </div>
      <div className="flex flex-col gap-10 xl:flex-row">
        <div className="3xl:w-[55%] order-1 xl:order-0 xl:w-[50%]">
          <p className="mb-5 text-2xl text-cyan-900">{post.intro}</p>
          <RenderHTML data={post.content} />
        </div>
        <div className="3xl:w-[40%] order-0 xl:order-1 xl:w-[45%]">
          <Image
            src={post.newsImage.url}
            alt={post.newsImage.alt}
            width={post.newsImage.width}
            height={post.newsImage.height}
            className="mx-auto rounded-xl"
          />
        </div>
      </div>
      {post.gallery.length > 0 && (
        <div className="pb-20">
          <h2 className="my-text-stroke2 mx-10 mb-5 text-2xl font-extrabold text-amber-400">
            Images from past event:
          </h2>
          <div className="aspect-auto max-w-full overflow-hidden rounded-xl border-2 border-cyan-900/30 shadow-xl shadow-cyan-900/40 lg:max-w-[60%] xl:max-w-[60%]">
            <EventGallery gallery={post.gallery} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;

const queryPostsBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "news",
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
