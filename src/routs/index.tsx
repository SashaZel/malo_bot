import React from "react";
import poster from "../assets/pictures/poster_small.png";
import logoBlack from "../assets/logos/logo_black.svg";
import { Link } from "react-router-dom";

export const Index = () => {
  
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
          No back-end needs.{" "}
        </p>
        <p className="text-neutral-700  text-lg xl:text-2xl ml-8">
          Your bot live in your browser.
        </p>
        <p className="text-neutral-700  text-lg xl:text-2xl ml-12">
          but able to answer
        </p>
        <p className="text-neutral-700  text-lg xl:text-2xl ml-36">
          to anyone
        </p>
        <Link
          to={"docs"}
          className="inline-block mt-10 ml-28 p-2 px-6 font-semibold text-xl bg-orange-600 hover:bg-red-600 rounded-md shadow-lg"
        >
          Try it now!
        </Link>
      </div>
      <h2 className="pt-12 lg:m-2 text-2xl font-semibold border-b-2">
        Frontend-only Telegram chatbot
      </h2>
      <p className="mx-8 pt-8 text-xl">
        No-coding chatbot.
      </p> 
      <p className="mx-4 text-xl">Just add an answer and keywords. Your bot is ready!
      </p>
      <p className="mx-2 pt-8 text-xl text-right">
        No backend needs. Chatbot lives on your machine. 
      </p>
      <p className="text-xl text-right"> 
        Keep your browser open.
        To quit chatbot just close the browser.
      </p>
      <p className="mx-2 pt-8">
        All changes save automaticly. Open this page again - and your chatbot is
        ready again with full history available.
      </p>
    </div>
  );
};
