import React from "react";
import { useTranslation } from "react-i18next";
import { ChatbotForm } from "./ChatbotForm";
import { ChatbotListOfReactions } from "./ChatbotListOfReactions";

export const ChatbotPanel = () => {
  //console.log("@ChatbotPanel");

  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="m-4 2xl:m-8">
        <h2 className="m-1 lg:m-2 text-xl font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
          {t("routs.work.chatbotAdmin", "Chatbot admin panel")}
        </h2>
        <p className="mx-2">{t("routs.work.manage", "Manage your chatbot.")}</p>
        <p className="mx-2">
          {t(
            "routs.work.addOrRem",
            "Add or remove your responses and keywords for responses."
          )}
        </p>
        <p className="mx-2">
          {t("routs.work.allChanges", "All changes will be saved automaticly.")}
        </p>
        <ChatbotForm />
        <ChatbotListOfReactions />
      </div>
    </div>
  );
};
