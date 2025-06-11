import Image from "next/image";
import GalleryCard from "./GalleryCard";

const galleryEvents = [
  {
    imageSrc: "/events/images/event1.webp",
  },
  {
    imageSrc: "/events/images/event2.webp",
  },
  {
    imageSrc: "/events/images/event3.webp",
  },
  {
    imageSrc: "/events/images/event4.webp",
  },
  {
    imageSrc: "/events/images/event5.webp",
  },
  {
    imageSrc: "/events/images/event6.webp",
  },
  {
    imageSrc: "/events/images/event7.webp",
  },
  {
    imageSrc: "/events/images/event8.webp",
  },
  {
    imageSrc: "/events/images/event9.webp",
  },
];

const GalleryGrid = () => {
  return (
    <main className="max-w-[1920px] bg-cyan-200/10 pt-[120px]">
      <div className="grid grid-cols-1 gap-4 px-[20px] pb-[50px] sm:grid-cols-2 sm:px-[50px] md:pb-[80px] lg:grid-cols-3 lg:px-[60px] 2xl:grid-cols-4 2xl:px-[160px]">
        {galleryEvents.map((event, i) => {
          return <GalleryCard key={i} image={event.imageSrc} />;
        })}
      </div>
    </main>
  );
};

export default GalleryGrid;
