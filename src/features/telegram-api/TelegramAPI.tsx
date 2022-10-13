import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { IMessage, telegramReducer } from "./telegramSlice";
import { MessagesList } from "./MessagesList";

const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

export const TelegramAPI = () => {
  //const [ listeningToUpdates, setListeningToUpdates ] = React.useState(false);
  const dispatch = useDispatch();

  const handleSendMessage = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    //console.log(e.target[0].value);

    axios
      .get(`https://api.telegram.org/bot${token}/sendMessage`, {
        params: {
          chat_id: 5122222407,
          text: e.target[0].value,
        },
      })
      .then(function (response) {
        console.log("response from sendMessage", response);
        // console.log(`response.data.ok = ${response.data.ok}`);
        // console.log(`response.data.result.chat.id = ${response.data.result.chat.id}`);
        // console.log(`response.data.result.chat.username = ${response.data.result.chat.username}`);
        // console.log(`response.data.result.from.id = ${response.data.result.from.id}`);
        // console.log(`response.data.result.text = ${response.data.result.text}`);
        const message: IMessage = {
          message_id: response.data.result.message_id,
          from: response.data.result.from,
          chat: response.data.result.chat,
          date: response.data.result.date,
          text: response.data.result.text,
        };
        dispatch(telegramReducer.actions.addMessage(message));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  React.useEffect(() => {
    let delay = 1000;
    let timeout: NodeJS.Timeout;

    const getBotUpdates = () => {
      console.log("@ getBotUpdates");
      //setListeningToUpdates(true);

      axios
        .get(`https://api.telegram.org/bot${token}/getUpdates`, {
          params: {
            //TODO: make something with offset!!!
            offset: 203079632,
            timeout: 10,
          },
        })
        .then(function (response) {
          //setListeningToUpdates(false);
          console.log(response);
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
            dispatch(telegramReducer.actions.addMessage(message));
          }

          delay = 1000;
          timeout = setTimeout(getBotUpdates, delay);
        })
        .catch(function (error) {
          //setListeningToUpdates(false);
          console.log("Could not get messeges from bot chats. Wait...", error);
          delay = delay * 2;
          timeout = setTimeout(getBotUpdates, delay);
        })
        .finally(function () {
          // always executed
        });
    };

    //if(!listeningToUpdates) {
    getBotUpdates();
    //}

    return () => timeout && clearTimeout(timeout);
  }, []);

  return (
    <>
      <h3>Hi, Telegram API!</h3>
      <p>Bot name:</p>
      <p>
        <a href="https://t.me/zelenkov_test_bot" target="blank">
          https://t.me/zelenkov_test_bot
        </a>
      </p>
      <MessagesList />
      <form className="text-right" onSubmit={(e) => handleSendMessage(e)}>
        <label>
          <h3 className="text-lg">Write the message</h3>
          <textarea className="block border-2 w-full"></textarea>
        </label>
        <input type="submit" value="Send Message" className="my-button" />
      </form>
    </>
  );
};
