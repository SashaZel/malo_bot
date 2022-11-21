import React from "react";
import { ChatbotForm } from "./ChatbotForm";
import { ChatbotListOfReactions } from "./ChatbotListOfReactions";

export const ChatbotPanel = () => {
  //console.log("@ChatbotPanel");

  return (
    <div className="w-full">
      <div className="m-4 2xl:m-8">
        <h2 className="m-1 lg:m-2 text-xl font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
          Chatbot admin panel
        </h2>
        <p className="mx-2">Manage your chatbot.</p>
        <p className="mx-2">
          Add or remove your responses and keywords for responses.
        </p>
        <p className="mx-2">All changes will be saved automaticly.</p>
        <ChatbotForm />
        <ChatbotListOfReactions />
      </div>
    </div>
  );
};
