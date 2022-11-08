import { get, set, clear, setMany } from "idb-keyval";
import { store } from "../app/store";
import { IChatbot } from "../features/chatbot/chatbotSlice";
import { IAccount } from "../features/telegram-api/telegramSlice";

export const getInitialLoginDataFromIDB = async (): Promise<{
  IDBAccountData: IAccount | null;
  hasIDBError: boolean;
}> => {
  console.log("@IDB_API getInitialLoginDataFromIDB()");
  try {
    const result: IAccount | undefined = await get("idb-account_data");
    if(
      typeof result?.bot_name === "string" &&
      typeof result.bot_token === "string" &&
      typeof result.update_id === "number"
    ) {
      return {IDBAccountData: result, hasIDBError: false}
    }

    return {IDBAccountData: null, hasIDBError: false}

  } catch (error) {
    console.error("@IDB_API getInitialLoginDataFromIDB() ", error);
  return {IDBAccountData: null, hasIDBError: true}
  }
};

export const saveChatbotToIDB = async (): Promise<void> => {
  console.log("@IDB_API saveChatbotToIDB()");
  const chatbotState = store.getState().chatbot;
  try {
    set("idb-chatbot", chatbotState);
  } catch (error) {
    console.error("@IDB_API saveChatbotToIDB() ", error);
  }
};

export const getChatbotFromIDB = async (): Promise<IChatbot | undefined> => {
  console.log("@IDB_API getChatbotFromIDB()");
  let chatbotState;
  try {
    chatbotState = await get("idb-chatbot");
  } catch (error) {
    console.error("@IDB_API getChatbotFromIDB() ", error);
  }
  return chatbotState;
};

export const clearIDB = () => {
  clear();
};

export const saveTelegramStateToIDB = () => {
  console.log("@IDB_API saveTelegramStateToIDB()");
  const telegramAppState = store.getState().telegram;
  try {
    setMany([
      ["idb-account_data", telegramAppState.account_data],
      ["idb-chats", telegramAppState.chats],
      ["idb-current_chat", telegramAppState.current_chat],
      ["idb-messages", telegramAppState.messages],
    ]);
  } catch (error) {
    console.error("@IDB_API saveTelegramStateToIDB() ", error);
  }
};
