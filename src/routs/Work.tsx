import React from "react";
import { ChatbotPanel } from "../features/chatbot/ChatbotPanel";
import { ChooseUser } from "../features/telegram/ChooseUser";
import { MessagesList } from "../features/telegram/MessagesList";
import { TelegramForm } from "../features/telegram/TelegramForm";
import lightningBackground from "../assets/pictures/lightning.svg"

export const Work = () => {
  return (
    <div className="flex">
      <div className="w-2/3 bg-white dark:bg-neutral-900">
        <ChooseUser />
        <ChatbotPanel />
      </div>
      <div className="w-1/3"  style={{ backgroundImage: `url(${lightningBackground})`, backgroundRepeat: "repeat-y" }}>
        <TelegramForm />
        <MessagesList />
      </div>
    </div>
  );
};
