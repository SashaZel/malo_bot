import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IChat, telegramReducer } from "./telegramSlice";

const borderStyle = (index: number, totalChats: number): string => {
  index++;
  let resultStyle = "";
  if (index === 1) {
    resultStyle += " rounded-tl-xl ";
  }
  if (index === 3) {
    resultStyle += " rounded-tr-xl ";
  }
  if (index <= 3) {
    resultStyle += " border-t-2 dark:border-t-0 ";
  }
  if ((index + 2) % 3 === 0) {
    resultStyle += " border-r-2 border-b-2 border-l-2 dark:border-l-0 ";
  }
  if ((index + 1) % 3 === 0) {
    resultStyle += " border-b-2 border-r-2 ";
  }
  if (index % 3 === 0) {
    resultStyle += " border-b-2 border-r-2 dark:border-r-0";
  }
  if (totalChats - index <= 2) {
    resultStyle += " dark:border-b-0 ";
  }
  if ((index % 3 === 1 || index%3 === 0) && ((totalChats - index) === 1 || (totalChats - index) === 2)) {
    resultStyle += " rounded-bl-xl ";
  }
  if (index === totalChats && index%3 === 0) {
    resultStyle += " rounded-br-xl ";
  }
  if (index === 1 && totalChats === 1) {
    resultStyle = ' border-2 rounded-xl ';
  }
  if (index === 2 && totalChats === 2) {
    resultStyle = ' border-2 rounded-tr-xl rounded-br-xl dark:border-none '
  }
  return resultStyle;
};

export const ChatButton: React.FC<{
  chat: IChat;
  indexInList: number;
  totalChats: number;
}> = ({ chat, indexInList, totalChats }) => {
  const dispatch = useDispatch();
  const currentChat = useSelector(
    (state: RootState) => state.telegram.current_chat
  );
  const styleForActiveOrNotChat =
    currentChat && chat.id === currentChat.id
      ? " border-lime-500 bg-gradient-to-br from-lime-500 via-lime-500 to-yellow-300 text-black"
      : " border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700";

  const setThisChatAsCurrent = () => {
    dispatch(telegramReducer.actions.setCurrentChat(chat));
  };

  return (
    <div
      className={`p-2 ${borderStyle(
        indexInList,
        totalChats
      )} ${styleForActiveOrNotChat}`}
      onClick={setThisChatAsCurrent}
    >
      <h5 className="mt-4 font-semibold">@{chat.username}</h5>
      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-500">
        {chat.first_name} {chat.last_name}
      </p>
      <p className="text-xs">Unread: {chat.unread_msg}</p>
    </div>
  );
};
