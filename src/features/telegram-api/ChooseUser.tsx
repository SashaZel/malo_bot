import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ChatButton } from "./ChatButton";
import { IChat, telegramReducer } from "./telegramSlice";

export const ChooseUser = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector(
    (state: RootState) => state.telegram.current_chat
  );
  const availableChats = useSelector(
    (state: RootState) => state.telegram.chats
  );

  const currentChatList = availableChats.map((chat: IChat) => (
    <ChatButton key={chat.id} chat={chat} />
  ));

  React.useEffect(() => {
    if (!currentChat && (availableChats.length > 0)) {
      dispatch(telegramReducer.actions.setCurrentChat(availableChats[0]));
    }
  }, [availableChats]);


  return (
    <div>
      <h3>Available chats:</h3>
      <div className="grid grid-cols-2 gap-2">
        {currentChatList.length === 0
          ? "No available chats yet"
          : currentChatList}
      </div>
      {currentChat && (
        <>
          <h3>
            Chat with {currentChat.first_name} {currentChat.last_name}
          </h3>
          <p>
            <a href={`https://t.me/${currentChat.username}`} target="blank">
              @{currentChat.username}
            </a>
          </p>
        </>
      )}
    </div>
  );
};
