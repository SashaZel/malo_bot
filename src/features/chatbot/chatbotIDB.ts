import { get, set } from "idb-keyval";
import { store } from "../../app/store"
import { IChatbot } from "./chatbotSlice";

export const saveChatbotToIDB = (): void => {
  const chatbotState = store.getState().chatbot;
  set("idb-chatbot", chatbotState)
    .then(() =>
      console.log('idb-chatbot saved')
    ).catch((error) => console.error('Error in idb.set save in ChatbotIDB', error))
}

export const getChatbotFromIDB = async (): Promise<IChatbot | undefined> => {
  let chatbotState;
  try {
    chatbotState = await get("idb-chatbot");
    //console.log('get chatbot state', chatbotState);
  } catch (error) {
    console.error('error in get @chatbotIDB', error);
  }
  return chatbotState;
}

