import GalleryCard from "./GalleryCard";

const GalleryGrid = ({ galleries }) => {
  // console.log("galleries", galleries);

  return (
    <main
      id="gallery"
      className="max-w-[1920px] bg-cyan-200/10 px-[20px] pt-[120px] pb-[50px] sm:px-[50px] md:pb-[80px] lg:px-[60px] 2xl:px-[160px]"
    >
      <h2 className="my-text-stroke relative mb-10 w-fit text-4xl font-extrabold text-cyan-900 after:absolute after:top-[calc(100%+5px)] after:left-0 after:h-[5px] after:w-[45%] after:rounded-2xl after:border-[1px] after:border-amber-400 after:bg-cyan-900 after:content-['']">
        Click to see galleries:
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {galleries.map((gallery, i) => {
          return <GalleryCard key={i} {...gallery} />;
        })}
      </div>
    </main>
  );
};

export default GalleryGrid;
