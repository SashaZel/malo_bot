import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTelegramStateToIDB } from "../../api/IDB_API";
import { AppDispatch, RootState } from "../../app/store";
import { Message } from "./Message";
import { IMessage, thunkSetLastTimeOfDisplay } from "./telegramSlice";

export const MessagesList = () => {

  //console.log('@MessageList');

  const dispatch: AppDispatch = useDispatch();
  const msgList = useSelector((state: RootState) => state.telegram.messages);
  const currentChat = useSelector(
    (state: RootState) => state.telegram.current_chat
  );

  React.useEffect(() => {
    if (currentChat) {
      dispatch(
        thunkSetLastTimeOfDisplay(currentChat?.id)
      );
    }
    saveTelegramStateToIDB();
  }, [msgList, currentChat?.id]);

  const listOfMessegesInCurrentChat = msgList.map((message: IMessage) => {
    if (currentChat?.id === message?.chat?.id) {
      return (
        <Message key={message?.message_id} message_id={message?.message_id} />
      );
    }
    return;
  });

  if (!currentChat || msgList.length === 0) {
    return (
      <div>
        <h3>No messages.</h3>
      </div>
    );
  }

  return (
    <div className="m-4 2xl:mr-12 mb-72">
      <div className="font-semibold text-xl my-1">Chat with</div>
      <div className="w-full border-b-2 border-t-2 py-2 mt-1 mb-2 dark:border-neutral-700">
        <div>
          {currentChat.first_name} {currentChat.last_name}
        </div>
        <p>
          <a href={`https://t.me/${currentChat.username}`} target="blank">
            @{currentChat.username}
          </a>
        </p>
      </div>
      {listOfMessegesInCurrentChat}
    </div>
  );
};