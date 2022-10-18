import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IChat, telegramReducer } from "./telegramSlice";

export const ChatButton: React.FC<{ chat: IChat }> = ({chat}) => {

  const dispatch = useDispatch()
  const currentChat = useSelector(
    (state: RootState) => state.telegram.current_chat
  );
  const borderStyle = (currentChat && chat.id === currentChat.id) ? 'border-4 border-green-500' : 'border-2';

  const setThisChatAsCurrent = () => {
    dispatch(telegramReducer.actions.setCurrentChat(chat));
  }

  return (
    <div 
      className={`p-2 bg-slate-100 ${borderStyle}`}
      onClick={setThisChatAsCurrent}
    >
      <h5>@{chat.username}</h5>
      <p className="text-xs">{chat.first_name} {chat.last_name}</p>
      <p className="text-xs">Unread: {chat.unread_msg}</p>
    </div>
  );
}