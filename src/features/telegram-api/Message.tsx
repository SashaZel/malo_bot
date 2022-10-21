import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { IMessage } from "./telegramSlice"

export const Message: React.FC<{message_id: number}> = ({message_id}) => {
  
  const message: IMessage | undefined = useSelector(
    (state: RootState) => state.telegram.messages.find((msg) => msg.message_id === message_id)
  );

  if(!message) {
    return null;
  }
  
  const botName = useSelector((state: RootState) => state.telegram.account_data.bot_name);
  const messageStyle = (botName === message?.from?.username) ? "ml-auto bg-gradient-to-r from-lime-200 to-lime-300 rounded-l-2xl rounded-tr-2xl" : "bg-gradient-to-r from-blue-200 to-blue-300 rounded-r-2xl rounded-tl-2xl";

  const time = new Date(message.date);

  return (
    <div className="w-full">
      <div className={`w-fit max-w-md my-1 p-3 ${messageStyle}`}>
        {message?.text}<span 
          className="text-stone-400 ml-2 inline-block translate-y-2"
        >{` ${time.getHours()}:${time.getMinutes()}`}</span>
      </div>
    </div>
  )
}