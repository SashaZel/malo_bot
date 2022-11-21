import { get, set, clear, setMany, entries, del } from "idb-keyval";
import { store } from "../app/store";
import { IChatbot } from "../features/chatbot/chatbotSlice";
import { IAccount, ITelegram } from "../features/telegram-api/telegramSlice";

export const getInitialLoginDataFromIDB = async (): Promise<{
  IDBAccountData: IAccount | null;
  hasIDBError: boolean;
}> => {
  console.log("@IDB_API getInitialLoginDataFromIDB()");
  try {
    const result: IAccount | undefined = await get("idb-account_data");
    if (
      typeof result?.bot_name === "string" &&
      typeof result.bot_token === "string" &&
      typeof result.update_id === "number"
    ) {
      return { IDBAccountData: result, hasIDBError: false };
    }

    return { IDBAccountData: null, hasIDBError: false };
  } catch (error) {
    console.error("@IDB_API getInitialLoginDataFromIDB() ", error);
    return { IDBAccountData: null, hasIDBError: true };
  }
};

export const saveTelegramAccountDataToIDB = (accountData: IAccount) => {
  console.log("@IDB_API saveTelegramAccountDataToIDB()");
  try {
    set("idb-account_data", accountData);
  } catch (error) {
    console.error("@IDB_API saveTelegramAccountDataToIDB() ", error);
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

export const saveTelegramStateToIDB = () => {
  console.log("@IDB_API saveTelegramStateToIDB()");
  const telegramAppState = store.getState().telegram;
  if (!telegramAppState.account_data.bot_name || !telegramAppState.account_data.bot_token) {
    return;
  }
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

export const getAvailableDataFromIDB = async (): Promise<
  Omit<ITelegram, "account_data">
> => {
  console.log("@IDB_API getAvailableDataFromIDB()");
  const resultFromIDB: Omit<ITelegram, "account_data"> = {
    current_chat: null,
    chats: [],
    messages: [],
  };
  try {
    const allEntriesFromIDB = await entries();
    allEntriesFromIDB.map(([IDBKey, IDBValue]) => {
      if (IDBKey === "idb-messages") {
        resultFromIDB.messages = IDBValue;
      }
      if (IDBKey === "idb-chats") {
        resultFromIDB.chats = IDBValue;
      }
      if (IDBKey === "idb-current_chat") {
        resultFromIDB.current_chat = IDBValue;
      }
    });
    return resultFromIDB;
  } catch (error) {
    console.error("@IDB_API getAvailableDataFromIDB() ", error);
    return resultFromIDB;
  }
};

export const deleteAccountDataIDB = () => {
  try {
    del("idb-account_data");
  } catch (error) {
    console.error("@IDB_API deleteAccountDataIDB() ", error);
  }
};

export const clearIDB = () => {
  try {
    clear();
  } catch (error) {
    console.error("@IDB_API clearIDB() ", error);
  }
};
