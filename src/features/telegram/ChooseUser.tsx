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
  const botName = useSelector((state: RootState) => state.telegram.account_data.bot_name);

  const currentChatList = availableChats.map((chat: IChat, indexInList) => (
    <ChatButton
      key={chat.id}
      chat={chat}
      indexInList={indexInList}
      totalChats={availableChats.length}
    />
  ));

  React.useEffect(() => {
    if (!currentChat && availableChats.length > 0) {
      dispatch(telegramReducer.actions.setCurrentChat(availableChats[0]));
    }
  }, [availableChats]);

  const emptyChatListCard = (
    <div className="pt-8 pb-4 pl-2 w-full border-2 rounded-xl dark:border-neutral-800 dark:bg-neutral-800 col-span-3">
      <h3 className="text-xl font-semibold text-red-700">No available chats yet</h3>
      <p className="text-neutral-700 dark:text-neutral-500">Your users have to contact your bot first.</p> 
      <p className="text-neutral-700 dark:text-neutral-500">Provide them a link to this chatbot via another means of communication:</p>
      <p className="font-semibold">
        <a
          href={`https://t.me/${botName}`}
          target="blank"
          className="inline-block mr-4"
        >
          https://t.me/{botName}
        </a>
      </p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="m-4 2xl:m-8">
        <h3 className="m-1 lg:m-2 text-xl font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
          Available chats:
        </h3>
        <div className="mt-4 grid grid-cols-3">
          {currentChatList.length === 0 ? (
            emptyChatListCard
          ) : (
            currentChatList
          )}
        </div>
      </div>
    </div>
  );
};
