import config from "@payload-config";
import { getPayload } from "payload";
import GymContent from "@/components/pageWrappers/GymContent";

const Gyms = async () => {
	const payload = await getPayload({ config });

	const gyms = await payload.find({
		collection: "gyms",
	});
	console.log(gyms);
	// console.log(gyms.docs.map((doc) => console.log(doc.relatedEvents)));

	return <GymContent initialGyms={gyms.docs} />;
};

export default Gyms;
