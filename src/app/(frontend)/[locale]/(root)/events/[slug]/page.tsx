const page = async ({ params }) => {
	const { slug } = await params;
	console.log(slug);

	return <div>{slug}</div>;
};

export default page;
