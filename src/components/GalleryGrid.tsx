import GalleryCard from "./GalleryCard";

const GalleryGrid = ({ galleries }) => {
	console.log("galleries", galleries);

	return (
		<main id="gallery" className="max-w-[1920px] bg-cyan-200/10 pt-[120px]">
			<div className="grid grid-cols-1 gap-4 px-[20px] pb-[50px] sm:grid-cols-2 sm:px-[50px] md:pb-[80px] lg:grid-cols-3 lg:px-[60px] 2xl:grid-cols-4 2xl:px-[160px]">
				{galleries.map((gallery, i) => {
					return <GalleryCard key={i} {...gallery} />;
				})}
			</div>
		</main>
	);
};

export default GalleryGrid;
