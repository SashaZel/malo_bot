import React from "react";
import { ChatbotPanel } from "../features/chatbot/ChatbotPanel";
import { ChooseUser } from "../features/telegram/ChooseUser";
import { MessagesList } from "../features/telegram/MessagesList";
import { TelegramForm } from "../features/telegram/TelegramForm";

export const Work = () => {
  return (
    <div className="flex">
      <div className="w-2/3">
        <ChooseUser />
        <ChatbotPanel />
      </div>
      <div className="w-1/3">
        <TelegramForm />
        <MessagesList />
      </div>
    </div>
  );
};
