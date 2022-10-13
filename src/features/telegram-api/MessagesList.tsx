import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Message } from "./Message";
import { IMessage } from "./telegramSlice";

export const MessagesList = () => {

  const msgList = useSelector((state: RootState) => state.telegram.messages)
  return (
    <div>
      <h3>Hello messages list</h3>
      {msgList.map((message: IMessage) => {
        return <Message key={message.message_id} message_id={message.message_id} />
      })}
    </div>
  );
}