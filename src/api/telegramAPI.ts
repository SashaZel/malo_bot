import axios from "axios";
import { store } from "../app/store";
import {
  IAccount,
  IChat,
  IMessage,
  telegramReducer,
} from "../features/telegram/telegramSlice";

export type Ifunction = (
  messageText: string,
  account_data: IAccount,
  current_chat: Omit<IChat, "lastReaction" | "date_of_last_display">,
  messageMarkup: string
) => void;

export interface IParamsForSend {
  chat_id: number;
  text: string;
  reply_markup?: string;
}

export const checkTelegramAccount = async (botTocken: string) => {
  console.log("@telegramAPI checkTelegramAccount()");
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${botTocken}/getMe`
    );
    if (typeof response?.data?.ok === "boolean") {
      return { accountIsValid: response.data.ok, errorInCheck: null };
    }
    throw new Error("Wrong type of Telegram API response");
  } catch (error) {
    console.error("@telegramAPI => fail to check accountData: ", error);
    return { accountIsValid: false, errorInCheck: error };
  }
};

export const sendMessage: Ifunction = async (
  messageText,
  account_data,
  current_chat,
  messageMarkup
) => {
  console.log("@telegramAPI sendMessage()");
  // console.log('TAPI currentChat ', current_chat);
  // console.log('TAPI currentAccount ', current_chat);
  if (!messageText || !current_chat || !current_chat) {
    return;
  }
  //console.log("ready to send after checks: ", messageText);
  const paramsForSend: IParamsForSend = {
    chat_id: current_chat.id,
    text: messageText,
  };

  if (messageMarkup) {
    paramsForSend.reply_markup = messageMarkup;
  }

  // axios
  //   .get(
  //     `https://api.telegram.org/bot${account_data.bot_token}/sendMessage`,
  //     {
  //       params: paramsForSend,
  //     }
  //   )
  //   .then(function (response) {
  //     //console.log("response from sendMessage", response);
  //     const message: IMessage = {
  //       message_id: response.data.result.message_id,
  //       from: response.data.result.from,
  //       chat: response.data.result.chat,
  //       date: response.data.result.date,
  //       text: response.data.result.text,
  //     };
  //     dispatch(
  //       // TODO: Add markup of buttons for messeges sent by bot
  //       telegramReducer.actions.addMessage({ message: message, markup: messageMarkup, update_id: 0 })
  //     );
  //   })
  //   .catch(function (error) {
  //     console.log('@TelegramAPI => Fail to send message ', error);
  //   });
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${account_data.bot_token}/sendMessage`,
      {
        params: paramsForSend,
      }
    );

    //console.log("response from sendMessage", response);
    const message: IMessage = {
      message_id: response.data.result.message_id,
      from: response.data.result.from,
      chat: response.data.result.chat,
      date: response.data.result.date,
      text: response.data.result.text,
    };
    store.dispatch(
      telegramReducer.actions.addMessage({
        message: message,
        markup: messageMarkup,
        update_id: 0,
      })
    );
  } catch (error) {
    console.error("@telegramAPI => Fail to send message ", error);
  }
};

interface IResultsOfPolling {
  update_id: number;
  message: IMessage;
}

export const pollingForMessages = async (
  botToken: string,
  updateID: number
): Promise<{
  resultOfPolling: IResultsOfPolling[];
  errorOfPolling: Error | null;
}> => {
  console.log("@telegramAPI pollingForMessages()");
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${botToken}/getUpdates`,
      {
        params: {
          offset: updateID,
          timeout: 10,
        },
      }
    );

    const responseDataResult: IResultsOfPolling | undefined =
      response?.data?.result;
    const responseDataOK = response?.data?.ok;

    if (responseDataOK === true && Array.isArray(responseDataResult)) {
      return { resultOfPolling: responseDataResult, errorOfPolling: null };
    }

    throw new Error(
      "@telegramAPI => Error in data format from pollingForMessages()"
    );
  } catch (error) {
    console.error("@telegramAPI pollingForMessages()", error);
    if (error instanceof Error) {
      return { resultOfPolling: [], errorOfPolling: error };
    } else {
      const newError = new Error(
        "@telegramAPI => undefined error in pollingForMessages()"
      );
      return { resultOfPolling: [], errorOfPolling: newError };
    }
  }
};
