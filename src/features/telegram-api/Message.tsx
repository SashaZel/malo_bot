import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { IMessage } from "./telegramSlice"

export const Message: React.FC<{message_id: number}> = ({message_id}) => {
  
  const message: IMessage | undefined = useSelector(
    (state: RootState) => state.telegram.messages.find((msg) => msg.message_id === message_id)
  );

  return (
    <div>
      <div>{`ID: ${message_id} - ${message?.text}`}</div>
    </div>
  )
}