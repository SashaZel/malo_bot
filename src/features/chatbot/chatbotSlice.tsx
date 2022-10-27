import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { KeywordButton } from "./KeywordButton";
import { ChatbotReaction } from "./ChatbotReaction";

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
    editAnswer: (
      state,
      action: PayloadAction<{ reactionName: string; newAnswer: string }>
    ) => {
      state.reactions[action.payload.reactionName] = action.payload.newAnswer;
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
      // TODO: Remove child reactions too
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

export const selectorListOfAllReactions = (
  state: RootState
) => {

  // Complicated selector function for display ordered nested tree of reactions
  // created from the flat state.chatbot.reactions object

  const unorderedListOfReactions = Object.entries(state.chatbot.reactions);
  const orderedListOfReactions = [];

  // recursive function for deepth-first search 

  const checkLoneChilds = (parentName: string) => {
    for (let i=0; i<unorderedListOfReactions.length; i++) {
      if (unorderedListOfReactions[i][0] === parentName) {
        continue;
      }
      if (!unorderedListOfReactions[i][0].startsWith(parentName)) {
        continue;
      }
      if (unorderedListOfReactions[i][0].slice(parentName.length+1).includes('~')) {
        continue;
      }
      orderedListOfReactions.push(unorderedListOfReactions[i]);
      checkLoneChilds(unorderedListOfReactions[i][0]);
    }
  }

  for (let i=0; i<unorderedListOfReactions.length; i++) {
    const [ candidatName, candidatAnswer ] = unorderedListOfReactions[i];
    if (!candidatName.includes('~')) {
      orderedListOfReactions.push([ candidatName, candidatAnswer ]);
      checkLoneChilds(candidatName);
    }
  }

  return orderedListOfReactions.map(
    ([reactionName, answer]) => <ChatbotReaction key={reactionName} reactionName={reactionName} answer={answer} />
  );
}

// First variant of simple selector returned NOT ordered list of reactions
// export const selectorListOfAllReactions = (
//   state: RootState
// ) => {
//   return Object.entries(state.chatbot.reactions).map(
//     ([reactionName, answer]) => <ChatbotReaction key={reactionName} reactionName={reactionName} answer={answer} />
//   );
// }
