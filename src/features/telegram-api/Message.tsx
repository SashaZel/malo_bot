import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { IMessage } from "./telegramSlice"

export const Message: React.FC<{message_id: number}> = ({message_id}) => {
  
  const message: IMessage | undefined = useSelector(
    (state: RootState) => state.telegram.messages.find((msg) => msg.message_id === message_id)
  );
  const botName = useSelector((state: RootState) => state.telegram.account_data.bot_name);
  const messageStyle = (botName === message?.from?.username) ? "ml-auto border-green-400" : "border-blue-400";

  return (
    <div className="w-full">
      <div className={`w-fit max-w-md my-1 p-2 border-2 ${messageStyle}`}>{`ID: ${message_id} - ${message?.text}`}</div>
    </div>
  )
}