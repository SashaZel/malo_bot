import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { KeywordButton } from "./KeywordButton";

export interface IChatbot {
  intents: {
    [keyword: string]: string;
  };
  reactions: {
    [action: string]: string;
  };
  lastReaction: string;
}

const INITIAL_STATE: IChatbot = {
  intents: {},
  reactions: {},
  lastReaction: "",
};

export const chatbotReducer = createSlice({
  name: "chatbot",
  initialState: INITIAL_STATE,
  reducers: {
    setState: (state, action: PayloadAction<{ newState: IChatbot }>) => {
      state.intents = action.payload.newState.intents;
      state.reactions = action.payload.newState.reactions;
    },
    setLastReaction: (state, action: PayloadAction<string>) => {
      state.lastReaction = action.payload;
    },
    addIntent: (
      state,
      action: PayloadAction<{
        keywords: string;
        pointerToAction: string;
        parent: string;
      }>
    ) => {
      // TODO: Add checking of uniq keyword
      action.payload.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .map((keyword: string) => {
          if (action.payload.parent) {
            state.intents[action.payload.parent + "~" + keyword] =
              action.payload.parent + "~" + action.payload.pointerToAction;
          } else {
            state.intents[keyword] = action.payload.pointerToAction;
          }
        });
    },
    removeIntent: (state, action: PayloadAction<{ keyword: string }>) => {
      delete state.intents[action.payload.keyword];
    },
    addReaction: (
      state,
      action: PayloadAction<{ reactionName: string; answer: string }>
    ) => {
      state.reactions[action.payload.reactionName] = action.payload.answer;
    },
    removeReaction: (
      state,
      action: PayloadAction<{ reactionForRemoving: string }>
    ) => {
      const intentsForRemoving = [];
      for (const [ keyword, pointerToReaction] of Object.entries(state.intents)) {
        if (pointerToReaction === action.payload.reactionForRemoving) {
          intentsForRemoving.push(keyword);
        }
      }
      intentsForRemoving.map((keywordForRemoving) => {
        delete state.intents[keywordForRemoving];
      })
      delete state.reactions[action.payload.reactionForRemoving];
    },
  },
});

export const selectorKeywordsList = (
  state: RootState,
  reactionName: string
) => {
  return Object.entries(state.chatbot.intents)
    .filter(([_, pointerToReaction]) => pointerToReaction === reactionName)
    .map(([keyword, _]) => {
      return <KeywordButton key={keyword} keyword={keyword} />;
    });
};
