import { chatbotReducer, IChatbot } from "./chatbotSlice";
import { store } from "../../app/store";
import { IAnswer } from "../../common/types";
import { IChat, telegramReducer } from "../telegram-api/telegramSlice";



export function splitTextAndMarkup (answer: string): IAnswer {
  const splitAnswer = answer.split('??reply_markup=')
  if(splitAnswer.length === 1) {
    return { text: splitAnswer[0], markup: "" };
  }
  if(splitAnswer.length === 2) {
    return { text: splitAnswer[0], markup: splitAnswer[1] };
  }
  return { text: "", markup: ""};
}

export function listenAndAnswer({
  inputMessage,
  inputChatID
}: {
  inputMessage: string,
  inputChatID: number
}): IAnswer {

  const chatbotState: IChatbot = store.getState().chatbot;
  const listOfChats: IChat[] = store.getState().telegram.chats;
  let lastReaction = "";
  for (let i = 0; i < listOfChats.length; i++) {
    if (listOfChats[i].id === inputChatID) {
      lastReaction = listOfChats[i].lastReaction;
    }
  }
  //const chatbotState = useSelector((state: RootState) => state.chatbot);
  if (!chatbotState || !chatbotState.intents || !chatbotState.reactions) {
    console.error("Chatbot state is not ready! @listenAndAnswer");
    return { text: "", markup: ""};
  }
  const pointerToReaction =
    // TODO: fix last reaction issue for each chat
    chatbotState.intents[lastReaction + "~" + inputMessage] ||
    chatbotState.intents[inputMessage];
  if (!pointerToReaction) {
    //store.dispatch(chatbotReducer.actions.setLastReaction(''));
    store.dispatch(telegramReducer.actions.setLastReaction({ chatID: inputChatID, lastReactionForThisChat: "" }));
    return { text: `You said: "${inputMessage}"`, markup: "" };
  }
  // TODO: fix last reaction issue for each chat
  //store.dispatch(chatbotReducer.actions.setLastReaction(pointerToReaction));
  store.dispatch(telegramReducer.actions.setLastReaction({ chatID: inputChatID, lastReactionForThisChat: pointerToReaction }));
  //console.log(chatbotState.reactions[pointerToReaction]);
  return splitTextAndMarkup(chatbotState.reactions[pointerToReaction]);
}
