import React from "react";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("Privacy");
  return (
    <main className="xsm:px-3 relative min-h-[calc(100vh-187px)] w-full max-w-[1920px] px-6 pt-3 pb-10 sm:px-10 lg:px-15 xl:px-55">
      <div className="my-15 flex flex-col items-start gap-12">
        <h1 className="font-nunito relative w-fit text-4xl text-cyan-900">
          {t("heading")}
        </h1>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy1.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy1.text1")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy1.text2")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy2.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy2.text1")}
            </p>
            <div className="font-nunito text-xl text-cyan-900">
              <p className="font-semibold">{t("policies.policy2.text2")}</p>
              <p>{t("policies.policy2.text3")}</p>
              <p>{t("policies.policy2.text4")}</p>
              <p>OIB: 70463597634</p>
              <p>
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
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy3.title")}
            </h5>
            <div className="font-nunito text-xl text-cyan-900">
              <p className="mb-3">{t("policies.policy3.text1")}</p>
              <p className="font-nunito text-xl font-semibold text-cyan-900">
                {t("policies.policy3.text2")}
              </p>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy3.text3")}
              </p>
            </div>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy3.text4")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy3.text5")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy4.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy4.title1")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy4.text")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_0.text1_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_0.text1_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_0.text1_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_0.text1_4")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_0.text1_5")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_0.text1_6")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy4.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_1.text1_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_1.text1_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_1.text1_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text1_1.text1_4")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy4.title2")}
            </p>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy4.text2")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text2_1.text2_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text2_1.text2_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text2_1.text2_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text2_1.text2_4")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy4.text2_1.text2_5")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy4.text3")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <h5 className="font-nunito text-2xl text-cyan-900">
            {t("policies.policy5.title")}
          </h5>
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-xl text-cyan-900">
              {t("policies.policy5.title1")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy5.text1")}
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="xsm:text-xs font-nunito border-b border-cyan-900/40 p-1 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.key1")}
                  </th>
                  <th className="font-nunito border-b border-cyan-900/40 p-1 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.key2")}
                  </th>
                  <th className="font-nunito border-b border-cyan-900/40 p-1 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.key3")}
                  </th>
                  <th className="font-nunito border-b border-cyan-900/40 p-1 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.key4")}
                  </th>
                </tr>
              </thead>
              <tbody className="cursor-pointer bg-white transition-all duration-300 hover:bg-slate-200">
                <tr>
                  <td className="xsm:text-xs font-nunito px-1 py-3 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.value1")}
                  </td>
                  <td className="xsm:text-xs font-nunito px-1 py-3 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.value2")}
                  </td>
                  <td className="xsm:text-xs xsm:text-center font-nunito px-1 py-3 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.value3")}
                  </td>
                  <td className="xsm:text-xs xsm:text-center font-nunito px-1 py-3 text-start text-sm text-cyan-900 sm:px-3 sm:py-2 sm:text-lg">
                    {t("policies.policy5.cookie.value4")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-xl text-cyan-900">
              {t("policies.policy5.title2")}
            </h5>
            <div>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy5.text2_1")}
              </p>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy5.text2_2")}
              </p>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy5.text2_3")}
              </p>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy5.text2_4")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy6.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy6.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy6.text2.text2_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy6.text2.text2_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy6.text2.text2_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy6.text2.text2_4")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy6.text2.text2_5")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy6.text3")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy7.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy7.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy7.text2.text2_1")}
                </p>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy7.text2.text2_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy7.text2.text2_3")}
                </p>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy7.text2.text2_4")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy7.text3")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy8.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy8.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy8.text2.text2_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy8.text2.text2_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy8.text2.text2_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy8.text2.text2_4")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy8.text3")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy8.text4")}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy9.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy9.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy9.text3.text3_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy9.text3.text3_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy9.text3.text3_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy9.text3.text3_4")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy9.text3.text3_5")}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy10.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy10.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy10.text2.text2_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy10.text2.text2_2")}
                </p>
              </li>
            </ul>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy10.text3")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy10.text4.text3_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy10.text4.text3_2")}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy11.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy11.text1")}
            </p>
            <ul className="font-nunito ml-5 list-disc text-xl text-cyan-900">
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_1")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_2")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_3")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_4")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_5")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_6")}
                </p>
              </li>
              <li>
                <p className="font-nunito text-xl text-cyan-900">
                  {t("policies.policy11.text2.text2_7")}
                </p>
              </li>
            </ul>
            <div>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy11.text3")}
              </p>
              <a
                href="mailto:support@bouldermeet.com"
                target="_blank"
                className="font-nunito text-xl text-cyan-900 underline"
              >
                support@bouldermeet.com
              </a>
            </div>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy11.text5")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy12.title")}
            </h5>
            <div>
              <p className="font-nunito text-xl text-cyan-900">
                {t("policies.policy12.text1")}
              </p>
              <p className="font-nunito text-xl font-semibold text-cyan-900">
                {t("policies.policy12.text2")}
              </p>
            </div>
            <p className="font-nunito text-xl text-cyan-900">
              Email:{" "}
              <a
                href="mailto:support@bouldermeet.com"
                target="_blank"
                className="font-nunito text-xl text-cyan-900 underline"
              >
                support@bouldermeet.com
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h5 className="font-nunito text-2xl text-cyan-900">
              {t("policies.policy13.title")}
            </h5>
            <p className="font-nunito text-xl text-cyan-900">
              {t("policies.policy13.text1")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
