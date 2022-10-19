import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { IChat, IMessage, telegramReducer } from "./telegramSlice";
import { RootState } from "../../app/store";
import { TelegramForm } from "./TelegramForm";
import { listenAndAnswer } from "../chatbot/inputListener";
import { Ifunction } from "../../common/types";

export const TelegramAPI = () => {

  const { account_data, current_chat} = useSelector((state: RootState) => state.telegram);
  const chatbotState = useSelector((state: RootState) => state.chatbot);
  const dispatch = useDispatch();

  console.log('@TAPI');

  const handleSendMessage: Ifunction = (messageText) => {

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
    let delay = 1000;
    let timeout: NodeJS.Timeout;

    const getBotUpdates = () => {

      axios
        .get(
          `https://api.telegram.org/bot${account_data.bot_token}/getUpdates`,
          {
            params: {
              offset: account_data.update_id,
              timeout: 10,
            },
          }
        )
        .then(function (response) {
          
          //console.log(response);
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
            dispatch(telegramReducer.actions.addChatToChats(newChat));
            dispatch(
              telegramReducer.actions.addMessage({
                message: message,
                update_id: response.data.result[i].update_id,
              })
            );
            //handleSendMessage('I receive your msg: ' + response.data.result[i].message.text);
            handleSendMessage(listenAndAnswer(response.data.result[i].message.text, chatbotState));
          }

          delay = 1000;
          timeout = setTimeout(getBotUpdates, delay);
        })
        .catch(function (error) {
          console.log("Could not get messeges from bot chats. Wait...", error);
          delay = delay * 2;
          timeout = setTimeout(getBotUpdates, delay);
        });
    };

    getBotUpdates();

    return () => timeout && clearTimeout(timeout);
  }, [account_data.update_id]);

  return (
    <>
      <h3>Hi, Telegram API!</h3>
      <p>Bot name:</p>
      <p>
        <a href={`https://t.me/${account_data.bot_name}`} target="blank">
          {account_data.bot_name}
        </a>
      </p>
      <p>Bot token: {account_data.bot_token}</p>
      <TelegramForm handleSendMessage={handleSendMessage} />
    </>
  );
};
