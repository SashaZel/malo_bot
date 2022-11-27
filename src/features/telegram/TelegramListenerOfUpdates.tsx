import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IChat, IMessage, telegramReducer } from "./telegramSlice";
import { RootState } from "../../app/store";
import { listenAndAnswer } from "../chatbot/inputListener";
import { pollingForMessages, sendMessage } from "../../api/telegramAPI";

export const TelegramListenerOfUpdates = () => {

  //console.log("@TelegramListenerOfUpdates");

  const isPooling = React.useRef(false);
  const account_data = useSelector(
    (state: RootState) => state.telegram.account_data
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Mount long polling listener for getting new messages from Telegram

    let delay = 1000;
    let timeout: number | null;

    const getBotUpdates = async () => {
      if (isPooling.current) return;

      isPooling.current = true;

      const { resultOfPolling, errorOfPolling } = await pollingForMessages(
        account_data.bot_token,
        account_data.update_id
      );

      for (let i = 0; i < resultOfPolling.length; i++) {
        //TODO: add guard for type checking
        const message: IMessage = {
          message_id: resultOfPolling[i].message.message_id,
          from: resultOfPolling[i].message.from,
          chat: resultOfPolling[i].message.chat,
          date: resultOfPolling[i].message.date,
          text: resultOfPolling[i].message.text,
        };
        const newChat: IChat = {
          id: resultOfPolling[i].message.chat.id,
          first_name: resultOfPolling[i].message.chat.first_name,
          last_name: resultOfPolling[i].message.chat.last_name,
          username: resultOfPolling[i].message.chat.username,
          lastReaction: "",
          date_of_last_display: 0,
        };
        dispatch(telegramReducer.actions.addChatToChats(newChat));
        dispatch(
          telegramReducer.actions.addMessage({
            message: message,
            markup: "",
            update_id: resultOfPolling[i].update_id,
          })
        );

        const { text, markup } = listenAndAnswer({
          inputMessage: resultOfPolling[i].message.text,
          inputChatID: resultOfPolling[i].message.chat.id,
        });
        sendMessage(
          text,
          account_data,
          resultOfPolling[i].message.chat,
          markup
        );
      }

      isPooling.current = false;

      delay = 1000;
      timeout && clearTimeout(timeout);
      timeout = null;
      timeout = setTimeout(getBotUpdates, delay);

      if (errorOfPolling) {
        isPooling.current = false;

        delay = delay * 2;
        timeout && clearTimeout(timeout);
        timeout = null;
        timeout = setTimeout(getBotUpdates, delay);
      }
    };

    getBotUpdates();

    return () => {
      timeout && clearTimeout(timeout);
      timeout = null;
    };
  }, [account_data.update_id]);

  return null;
};
