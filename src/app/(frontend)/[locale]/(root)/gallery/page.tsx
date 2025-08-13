import GalleryContent from "@/components/pageWrappers/GalleryContent";
import { getPayload } from "payload";
import config from "@payload-config";

const Gallery = async () => {
  const payload = await getPayload({ config });

  const gallery = await payload.find({
    collection: "events",
    select: {
      slug: true,
      title: true,
      gym: true,
      location: true,
      from: true,
      gallery: true,
      heroImage: true,
    },
  });
  // console.log(gallery);
  return <GalleryContent initialGalleries={gallery.docs} />;
};

export default Gallery;
