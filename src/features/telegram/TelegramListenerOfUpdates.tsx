import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IChat,
  IMessage,
  telegramReducer,
  thunkGetAndAnswer,
} from "../../app/telegramSlice";
import { AppDispatch, RootState } from "../../app/store";
import { pollingForMessages } from "../../api/telegramAPI";

export const TelegramListenerOfUpdates = () => {
  
  //console.log("@TelegramListenerOfUpdates");

  const isPooling = React.useRef(false);
  const account_data = useSelector(
    (state: RootState) => state.telegram.account_data
  );
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    // Mount long polling listener for getting new messages from Telegram

    let delay = 1000;
    let timeout: number | null | NodeJS.Timeout;

    const getBotUpdates = async () => {
      if (isPooling.current) return;

      isPooling.current = true;

      const { resultOfPolling, errorOfPolling } = await pollingForMessages(
        account_data.bot_token,
        account_data.update_id
      );

      for (let i = 0; i < resultOfPolling.length; i++) {
        if (
          !resultOfPolling[i] ||
          !resultOfPolling[i].message ||
          !resultOfPolling[i].message.message_id ||
          !resultOfPolling[i].message.from ||
          !resultOfPolling[i].message.chat ||
          !resultOfPolling[i].message.date ||
          !resultOfPolling[i].message.text
        ) {
          continue;
        }

        const newChat: IChat = {
          id: resultOfPolling[i].message.chat.id,
          first_name: resultOfPolling[i].message.chat.first_name,
          last_name: resultOfPolling[i].message.chat.last_name,
          username: resultOfPolling[i].message.chat.username,
          lastReaction: "",
          date_of_last_display: 0,
        };
        dispatch(telegramReducer.actions.addChatToChats(newChat));

        const message: IMessage = {
          message_id: resultOfPolling[i].message.message_id,
          from: resultOfPolling[i].message.from,
          chat: resultOfPolling[i].message.chat,
          date: resultOfPolling[i].message.date,
          text: resultOfPolling[i].message.text,
        };
        dispatch(
          thunkGetAndAnswer({
            receivedMessage: message,
            updateID: resultOfPolling[i].update_id,
          })
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
