import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { IChat, IMessage, telegramReducer } from "./telegramSlice";
import { RootState } from "../../app/store";
import { TelegramForm } from "./TelegramForm";
import { listenAndAnswer } from "../chatbot/inputListener";
import { Ifunction } from "../../common/types";

export const TelegramAPI = () => {

  const isPooling = React.useRef(false);
  const account_data = useSelector((state: RootState) => state.telegram.account_data);
  const dispatch = useDispatch();

  console.log('@TAPI');

  const handleSendMessage: Ifunction = (messageText, account_data, current_chat) => {

    // console.log("ready to send: ", messageText);
    // console.log('TAPI currentChat ', current_chat);
    // console.log('TAPI currentAccount ', current_chat);
    if (!messageText || !current_chat || !current_chat) {
      return;
    }
    //console.log("ready to send after checks: ", messageText);

    axios
      .get(
        `https://api.telegram.org/bot${account_data.bot_token}/sendMessage`,
        {
          params: {
            chat_id: current_chat.id,
            text: messageText,
          },
        }
      )
      .then(function (response) {
        console.log("response from sendMessage", response);
        const message: IMessage = {
          message_id: response.data.result.message_id,
          from: response.data.result.from,
          chat: response.data.result.chat,
          date: response.data.result.date,
          text: response.data.result.text,
        };
        dispatch(
          telegramReducer.actions.addMessage({ message: message, update_id: 0 })
        );
      })
      .catch(function (error) {
        console.log('Fail to send message at "TelegramAPI" ', error);
      });
  };

  React.useEffect(() => {

    // TODO: Fix doubling the callbacks when re-renders component!!!

    let delay = 1000;
    let timeout: NodeJS.Timeout | null = null;

    const getBotUpdates = () => {

      if (isPooling.current) return;

      isPooling.current = true;

      axios
        .get(
          `https://api.telegram.org/bot${account_data.bot_token}/getUpdates`,
          {
            params: {
              offset: account_data.update_id,
              timeout: 10,
            }
          }
        )
        .then(function (response) {
          
          console.log("TAPI response", response.data);
          // console.log(`response.data.ok = ${response.data.ok}`);
          // console.log(`response.data.result.chat.id = ${response.data.result.chat.id}`);
          // console.log(`response.data.result.chat.username = ${response.data.result.chat.username}`);
          // console.log(`response.data.result.from.id = ${response.data.result.from.id}`);
          // console.log(`response.data.result.text = ${response.data.result.text}`);

          for (let i = 0; i < response.data.result.length; i++) {
            const message: IMessage = {
              message_id: response.data.result[i].message.message_id,
              from: response.data.result[i].message.from,
              chat: response.data.result[i].message.chat,
              date: response.data.result[i].message.date,
              text: response.data.result[i].message.text,
            };
            const newChat: IChat = {
              id: response.data.result[i].message.chat.id,
              first_name: response.data.result[i].message.chat.first_name,
              last_name: response.data.result[i].message.chat.last_name,
              username: response.data.result[i].message.chat.username,
              //TODO: Do something with unread msgs
              unread_msg: 0,
            };
            // TODO: Now bot answer to current account, not to the account which 
            // send the message
            dispatch(telegramReducer.actions.addChatToChats(newChat));
            dispatch(
              telegramReducer.actions.addMessage({
                message: message,
                update_id: response.data.result[i].update_id,
              })
            );
            //handleSendMessage('I receive your msg: ' + response.data.result[i].message.text);
            handleSendMessage(
              listenAndAnswer(response.data.result[i].message.text),
              account_data, 
              response.data.result[i].message.chat
            );
          }
          
          isPooling.current = false;

          delay = 1000;
          timeout && clearTimeout(timeout);
          timeout = null;
          timeout = setTimeout(getBotUpdates, delay);
        })
        .catch(function (error) {
          console.log("Could not get messeges from bot chats. Wait...", error);
          
          isPooling.current = false;

          delay = delay * 2;
          timeout && clearTimeout(timeout);
          timeout = null;
          timeout = setTimeout(getBotUpdates, delay);
        });
    };

    getBotUpdates();

    return () => {
      timeout && clearTimeout(timeout);
      timeout = null;
    }
  }, [account_data.update_id]);

  return (
    <div
      className="bg-gradient-to-br p-2 my-2 rounded-bl-xl rounded-tr-xl from-pink-800 to-pink-700"
    >
      <TelegramForm handleSendMessage={handleSendMessage} />
    </div>
  );
};
