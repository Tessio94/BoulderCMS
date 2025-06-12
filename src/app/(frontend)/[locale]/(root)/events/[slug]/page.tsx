import Image from "next/image";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);

  return (
    <>
      <div className="relative z-0 flex h-screen min-h-[800px] w-full items-center justify-center overflow-hidden bg-[url(/homepage/gallery_1024.jpg)] bg-no-repeat lg:block lg:h-fit lg:min-h-[unset] lg:bg-none">
        {/* <Image
          className="hidden lg:block lg:h-auto lg:object-contain"
          src="/homepage/gallery.jpg"
          alt="climber on boulder"
          width={1920}
          height={1080}
        /> */}
      </div>
    </>
  );
};

export default page;
