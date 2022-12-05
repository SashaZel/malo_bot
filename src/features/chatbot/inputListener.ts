import React from 'react';
import { IChatbot } from "./chatbotSlice";
import { store } from "../../app/store";
import { IChat, telegramReducer } from "../telegram/telegramSlice";
import { useStore } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { splitTextAndMarkup } from '../../utils/splitTextAndMarkup';


export const sum = (a: number, b: number) => {
  return a + b;
}

export function useListenAndAnswer({
  inputMessage,
  inputChatID,
}: {
  inputMessage: string;
  inputChatID: number;
}): { text: string, markup: string} {

  // access store via useStore for testing ability
  //const store = useStore<RootState, AnyAction>();

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
