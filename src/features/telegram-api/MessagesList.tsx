import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Message } from "./Message";
import { IMessage } from "./telegramSlice";

export const MessagesList = () => {

  const msgList = useSelector((state: RootState) => state.telegram.messages);
  const currentChat = useSelector((state: RootState) => state.telegram.current_chat);

  if(!currentChat || msgList.length === 0) {
    return (
      <div>
        <h3>No messages.</h3>
      </div>
    );
  }

  return (
    <div className="md:m-3">
      {msgList.map((message: IMessage) => {
        if (currentChat?.id === message?.chat?.id) {
          return <Message key={message?.message_id} message_id={message?.message_id} />
        }
        return;
      })}
    </div>
  );
}