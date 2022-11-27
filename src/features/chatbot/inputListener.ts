import { IChatbot } from "./chatbotSlice";
import { store } from "../../app/store";
import { IChat, telegramReducer } from "../telegram/telegramSlice";

export function splitTextAndMarkup(answer: string): { text: string, markup: string} {
  const splitAnswer = answer.split("??reply_markup=");
  if (splitAnswer.length === 1) {
    return { text: splitAnswer[0], markup: "" };
  }
  if (splitAnswer.length === 2) {
    return { text: splitAnswer[0], markup: splitAnswer[1] };
  }
  return { text: "", markup: "" };
}

export function listenAndAnswer({
  inputMessage,
  inputChatID,
}: {
  inputMessage: string;
  inputChatID: number;
}): { text: string, markup: string} {

  const chatbotState: IChatbot = store.getState().chatbot;
  const listOfChats: IChat[] = store.getState().telegram.chats;

  let lastReaction = "";
  for (let i = 0; i < listOfChats.length; i++) {
    if (listOfChats[i].id === inputChatID) {
      lastReaction = listOfChats[i].lastReaction;
    }
  }
  if (
    !chatbotState ||
    !chatbotState.intents ||
    !chatbotState.reactions ||
    !chatbotState.settings
  ) {
    console.error("Chatbot state is not ready! @listenAndAnswer");
    return { text: "", markup: "" };
  }
  if (!chatbotState.settings.isActive) {
    return { text: "", markup: "" };
  }
  const pointerToReaction =
    chatbotState.intents[lastReaction + "~" + inputMessage] ||
    chatbotState.intents[inputMessage];

  if (!pointerToReaction) {
    store.dispatch(
      telegramReducer.actions.setLastReaction({
        chatID: inputChatID,
        lastReactionForThisChat: "",
      })
    );
    
    return {
      text:
        chatbotState.settings.defaultAnswer.firstPartOfAnswer +
        (chatbotState.settings.defaultAnswer.addCitationOfUserMessage
          ? inputMessage +
            chatbotState.settings.defaultAnswer.secondPartOfAnswer
          : ""),
      markup: "",
    };
  }
  
  store.dispatch(
    telegramReducer.actions.setLastReaction({
      chatID: inputChatID,
      lastReactionForThisChat: pointerToReaction,
    })
  );
  
  return splitTextAndMarkup(chatbotState.reactions[pointerToReaction]);
}
