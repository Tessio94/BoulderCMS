import MotionClientWrapper from "./motion/MotionClientWrapper";
import { cardsGalleryVariants } from "@/lib/animation";
import GalleryCardWrapper from "./GalleryCardWrapper";

const GalleryCard = ({ heroImage, title, from, gym, slug }) => {
  return (
    // <Link href={`/gallery/${slug}`}>
    <MotionClientWrapper
      className="border-cards hover:shadow-cards-dark shadow-cards relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      initial="hidden"
      variants={cardsGalleryVariants}
    >
      <GalleryCardWrapper
        heroImage={heroImage}
        title={title}
        from={from}
        gym={gym}
        slug={slug}
      />
    </MotionClientWrapper>
    // </Link>
  );
};

export default GalleryCard;
