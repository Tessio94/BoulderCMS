"use client";

import Image from "next/image";
import { Masonry } from "@/components/lib/Masonry";

export default function MasonryGrid({ event }) {
  const items = event.gallery.map((photo) => photo);
  // console.log(items);
  return (
    <Masonry
      items={items}
      config={{
        columns: [1, 2, 3, 4],
        gap: [24, 12, 6, 4],
        media: [640, 768, 1024, 1600],
      }}
      render={(item, index) => {
        return (
          <a
            key={index}
            href={item.url}
            data-fancybox="gallery"
            data-caption={item.alt}
            className="group relative block"
          >
            <Image
              src={item.url}
              alt={item.alt}
              width={item.width}
              height={item.height}
              style={{ width: "100%", height: "auto" }}
              className="rounded-xl"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-color1 absolute top-3 right-3 h-10 w-10 rounded-2xl bg-white/70 p-2 transition-all duration-300 xl:opacity-0 xl:group-hover:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 3h6v6m0-6l-7 7m-3 11H3v-6m0 6l7-7"
              />
            </svg>
          </a>
        );
      }}
    />
  );
}
