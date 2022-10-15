import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ChatButton } from "./ChatButton";
import { IChat } from "./telegramSlice";

export const ChooseUser = () => {
  const currentChat = useSelector(
    (state: RootState) => state.telegram.current_chat
  );
  const availableChats = useSelector(
    (state: RootState) => state.telegram.chats
  );

  return (
    <div>
      <h3>Available chats:</h3>
      <div className="grid grid-cols-2 gap-2">
        {availableChats.map((chat: IChat) => (
          <ChatButton key={chat.id} chat={chat} />
        ))}
      </div>
      <h3>
        Chat with {currentChat.first_name} {currentChat.last_name}
      </h3>
      <p>
        <a href={`https://t.me/${currentChat.username}`} target="blank">
          @{currentChat.username}
        </a>
      </p>
    </div>
  );
};
