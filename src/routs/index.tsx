import React from "react";
import poster from "../assets/pictures/poster_small.png";
import logoBlack from "../assets/logos/logo_black.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="m-4 2xl:m-6 2xl:w-10/12">
      <div
        className="h-[900px] bg-bottom xl:bg-right xl:h-[700px] pt-2 xl:pt-8 bg-white dark:bg-neutral-100"
        style={{
          backgroundImage: `url("${poster}")`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={logoBlack} alt="logo" className="block w-1/2 ml-12" />
        <h4 className="text-black ml-4 mt-8 text-3xl index-page-slackey-font">
          Frontend <span className="text-4xl">only</span>{" "}
        </h4>
        <h4 className="text-black ml-12 mt-2 text-4xl index-page-slackey-font">
          Telegram <span className="text-3xl">chatbot</span>
        </h4>
        <p className="text-neutral-700 text-lg xl:text-2xl ml-28 mt-12 xl:mt-36 shadow- shadow-white">
          {t("routs.index.noBack")}{" "}
        </p>
        <p className="text-neutral-700  text-lg xl:text-2xl ml-8">
          {t("routs.index.yourCh")}
        </p>
        <p className="text-neutral-700  text-lg xl:text-2xl ml-12">
          {t("routs.index.butAble")}
        </p>
        <p className="text-neutral-700  text-lg xl:text-2xl ml-36">
          {t("routs.index.toAnyone")}
        </p>
        <Link
          to={"docs"}
          className="inline-block mt-10 ml-28 p-2 px-6 font-semibold text-xl bg-orange-600 hover:bg-red-600 rounded-md shadow-lg"
        >
          {t("routs.index.tryItNow")}
        </Link>
      </div>
      <h2 className="pt-12 lg:m-2 text-2xl font-semibold border-b-2">
        {t("routs.index.frontendOnly")}
      </h2>
      <p className="mx-8 pt-8 text-xl">{t("routs.index.noCoding")}</p>
      <p className="mx-4 text-xl">{t("routs.index.just")}</p>
      <p className="mx-2 pt-8 text-xl text-right">
        {t("routs.index.noBackend")}
      </p>
      <p className="text-xl text-right">{t("routs.index.keep")}</p>
      <p className="mx-2 pt-8">{t("routs.index.all")}</p>
    </div>
  );
};
