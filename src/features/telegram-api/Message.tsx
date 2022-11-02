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
  const messageStyle = (botName === message?.from?.username) ? "ml-auto bg-gradient-to-r from-pink-800 to-pink-700 rounded-l-2xl rounded-tr-2xl" : "bg-gradient-to-r from-indigo-800 to-blue-700 rounded-r-2xl rounded-tl-2xl";

  const timeInUTC = new Date(0, 0, 0, 0, 0, Number(message.date));
  const localTime = new Date(timeInUTC.getTime() - timeInUTC.getTimezoneOffset()*60*1000);

  return (
    <div className="w-full">
      <div className={`w-fit max-w-md my-1 p-3 text-yellow-100 ${messageStyle}`}>
        {message?.text}<span 
          className="text-orange-400 ml-2 inline-block translate-y-2"
        >{` ${String(localTime.getHours()).padStart(2, "0")}:${String(localTime.getMinutes()).padStart(2, "0")}`}</span>
      </div>
    </div>
  )
}