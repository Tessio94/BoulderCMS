import React from "react";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("Impressum");

  return (
    <main className="xsm:px-3 relative min-h-[calc(100vh-187px)] w-full max-w-[1920px] px-6 pt-3 pb-10 sm:px-10 lg:px-15 xl:px-55">
      <div className="my-15 flex flex-col items-start gap-12">
        <h1 className="font-nunito relative mb-8 w-fit text-4xl text-cyan-900">
          {t("heading")}
        </h1>
        <div className="flex flex-col items-start gap-8">
          <div>
            <h5 className="font-nunito text-2xl font-semibold text-cyan-900">
              {t("impressum.title1")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text1.text1_1")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text1.text1_2")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text1.text1_3")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text1.text1_4")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text1.text1_5")}
            </p>
          </div>
          <p className="font-nunito text-xl text-cyan-900">
            {" "}
            Email:{" "}
            <a
              href="mailto:support@bouldermeet.com"
              target="_blank"
              className="underline"
            >
              support@bouldermeet.com
            </a>
          </p>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div>
            <h5 className="font-nunito text-2xl font-semibold text-cyan-900">
              {t("impressum.title2")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text2.text2_1")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text2.text2_2")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div>
            <h5 className="font-nunito text-2xl font-semibold text-cyan-900">
              {t("impressum.title3")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text3.text3_1")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div>
            <h5 className="font-nunito text-2xl font-semibold text-cyan-900">
              {t("impressum.title4")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text4.text4_1")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div>
            <h5 className="font-nunito text-2xl font-semibold text-cyan-900">
              {t("impressum.title5")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("impressum.text5.text4_1")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
