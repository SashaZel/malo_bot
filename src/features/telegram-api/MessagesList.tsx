import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Message } from "./Message";
import { IMessage } from "./telegramSlice";

export const MessagesList = () => {

  const msgList = useSelector((state: RootState) => state.telegram.messages);
  const currentChatID = useSelector((state: RootState) => state.telegram.current_chat.id);

  return (
    <div>
      {msgList.map((message: IMessage) => {
        if (currentChatID === message.chat.id) {
          return <Message key={message.message_id} message_id={message.message_id} />
        }
        return;
      })}
    </div>
  );
}