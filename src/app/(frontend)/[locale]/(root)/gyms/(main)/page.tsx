import config from "@payload-config";
import { getPayload } from "payload";
import GymContent from "@/components/pageWrappers/GymContent";
import { LocaleType } from "@/types";

const Gyms = async ({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) => {
  const payload = await getPayload({ config });
  const { locale } = await params;

  console.log("localeDe", locale);

  const gyms = await payload.find({
    collection: "gyms",
    locale,
  });
  // console.log(gyms);
  // console.log(gyms.docs.map((doc) => console.log(doc.workingHours)));

  return <GymContent initialGyms={gyms.docs} locale={locale} />;
};

export default Gyms;
