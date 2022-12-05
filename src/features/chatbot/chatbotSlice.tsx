import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../../app/store";
import { KeywordButton } from "./KeywordButton";
import { ChatbotReaction } from "./ChatbotReaction";
import { saveThunkChatbotToIDB } from "../../api/IDB_API";

export interface IChatbot {
  intents: {
    [keyword: string]: string;
  };
  reactions: {
    [action: string]: string;
  };
  settings: {
    isActive: boolean;
    defaultAnswer: {
      addCitationOfUserMessage: boolean;
      firstPartOfAnswer: string;
      secondPartOfAnswer: string;
    };
  };
}

const initialExampleIntents = {
  "/start": "Start",
  "FirstDog~dog": "FirstDog~SecondDog",
  "FirstDog~woof": "FirstDog~SecondDog",
  Hello: "Greeting",
  dog: "FirstDog",
  game: "quiz",
  hello: "Greeting",
  hi: "Greeting",
  "let's play!": "quiz",
  quiz: "quiz",
  "quiz~A: cube": "quiz~A",
  "quiz~B: sphere": "quiz~B",
  "quiz~C: irregularly shaped ellipsoid": "quiz~C",
  "quiz~D: flat": "quiz~D",
  woof: "FirstDog",
  "привет!": "Greeting",
};

const initialExampleReactions = {
  FirstDog: "First dog's answer.",
  "FirstDog~SecondDog": "Second dog's answer.",
  Greeting: "Hello, dear friend!",
  Start: "Welcome!",
  quiz: 'What is the shape of the Earth???reply_markup={"keyboard":[["A: cube"],["B: sphere"],["C: irregularly shaped ellipsoid"],["D: flat"]],"resize_keyboard":true,"one_time_keyboard":true}',
  "quiz~A": "Are you kidding? Of course, NO!",
  "quiz~B": "Mmm... no, not exactly a sphere...",
  "quiz~C": "You are right! Smart one!",
  "quiz~D": "Oh, Jesus... No...",
};

const INITIAL_STATE: IChatbot = {
  intents: initialExampleIntents,
  reactions: initialExampleReactions,
  settings: {
    isActive: true,
    defaultAnswer: {
      addCitationOfUserMessage: true,
      firstPartOfAnswer: 'You said: "',
      secondPartOfAnswer: '"',
    },
  },
};

export const chatbotReducer = createSlice({
  name: "chatbot",
  initialState: INITIAL_STATE,
  reducers: {
    setState: (state, action: PayloadAction<{ newState: IChatbot }>) => {
      state.intents = action.payload.newState.intents;
      state.reactions = action.payload.newState.reactions;
      state.settings = action.payload.newState.settings;
    },

    setSettings: (
      state,
      action: PayloadAction<IChatbot["settings"]>
    ) => {
      state.settings = action.payload;
    },

    settingIsActive: (
      state,
      action: PayloadAction<{ activeChatbot: boolean }>
    ) => {
      state.settings.isActive = action.payload.activeChatbot;
    },

    settingAddCitation: (state, action: PayloadAction<{ addCit: boolean }>) => {
      state.settings.defaultAnswer.addCitationOfUserMessage =
        action.payload.addCit;
    },

    settingFirstPartOfDefaultAnswer: (
      state,
      action: PayloadAction<{ firstPart: string }>
    ) => {
      state.settings.defaultAnswer.firstPartOfAnswer = action.payload.firstPart;
    },

    settingSecondPartOfDefaultAnswer: (
      state,
      action: PayloadAction<{ secondPart: string }>
    ) => {
      state.settings.defaultAnswer.secondPartOfAnswer =
        action.payload.secondPart;
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
      // TODO: Add checking for removing not the last keyword for given pointer to reaction
      delete state.intents[action.payload.keyword];
    },

    addReaction: (
      state,
      action: PayloadAction<{
        reactionParent: string;
        reactionName: string;
        answer: string;
        buttonMarkup: string;
      }>
    ) => {
      const readyReactionName = action.payload.reactionParent
        ? action.payload.reactionParent + "~" + action.payload.reactionName
        : action.payload.reactionName;
      const readyReactionAnswer = action.payload.buttonMarkup
        ? action.payload.answer +
          "??reply_markup=" +
          action.payload.buttonMarkup
        : action.payload.answer;
      state.reactions[readyReactionName] = readyReactionAnswer;
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
      for (const [keyword, pointerToReaction] of Object.entries(
        state.intents
      )) {
        if (pointerToReaction.includes(action.payload.reactionForRemoving)) {
          intentsForRemoving.push(keyword);
        }
      }
      intentsForRemoving.map((keywordForRemoving) => {
        delete state.intents[keywordForRemoving];
      });
      const childsOfReactionForRemoving = [];
      for (const [reaction, answer] of Object.entries(state.reactions)) {
        if (reaction.includes(action.payload.reactionForRemoving)) {
          childsOfReactionForRemoving.push(reaction);
        }
      }
      childsOfReactionForRemoving.map((reactionForRemoving) => {
        delete state.reactions[reactionForRemoving];
      });
    },
  },
});

// FIXME:

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

export const selectorListOfAllReactions = (state: RootState) => {
  // Complicated selector function for display ordered nested tree of reactions
  // created from the flat state.chatbot.reactions object

  const unorderedListOfReactions = Object.entries(state.chatbot.reactions);
  const orderedListOfReactions = [];

  // recursive function for deepth-first search

  const checkLoneChilds = (parentName: string) => {
    for (let i = 0; i < unorderedListOfReactions.length; i++) {
      if (unorderedListOfReactions[i][0] === parentName) {
        continue;
      }
      if (!unorderedListOfReactions[i][0].startsWith(parentName)) {
        continue;
      }
      if (
        unorderedListOfReactions[i][0]
          .slice(parentName.length + 1)
          .includes("~")
      ) {
        continue;
      }
      orderedListOfReactions.push(unorderedListOfReactions[i]);
      checkLoneChilds(unorderedListOfReactions[i][0]);
    }
  };

  for (let i = 0; i < unorderedListOfReactions.length; i++) {
    const [candidatName, candidatAnswer] = unorderedListOfReactions[i];
    if (!candidatName.includes("~")) {
      orderedListOfReactions.push([candidatName, candidatAnswer]);
      checkLoneChilds(candidatName);
    }
  }

  return orderedListOfReactions.map(([reactionName, answer]) => (
    <ChatbotReaction
      key={reactionName}
      reactionName={reactionName}
      answer={answer}
    />
  ));
};

export const thunkRemoveIntent =
  ({ keyword }: { keyword: string }) =>
  (dispatch: AppDispatch, getState: typeof store.getState) => {
    const state = getState();
    const chatbotState = state.chatbot;
    saveThunkChatbotToIDB(chatbotState);
    dispatch(chatbotReducer.actions.removeIntent({ keyword: keyword }));
  };

export const thunkAddIntent =
  ({
    keywords,
    pointerToReaction,
    parent,
  }: {
    keywords: string;
    pointerToReaction: string;
    parent: string;
  }) =>
  (dispatch: AppDispatch, getState: typeof store.getState) => {
    const state = getState();
    const chatbotState = state.chatbot;
    saveThunkChatbotToIDB(chatbotState);
    dispatch(
      chatbotReducer.actions.addIntent({
        keywords: keywords,
        pointerToAction: pointerToReaction,
        parent: parent,
      })
    );
  };

export const thunkRemoveReaction =
  ({ reactionForRemoving }: { reactionForRemoving: string }) =>
  (dispatch: AppDispatch, getState: typeof store.getState) => {
    const state = getState();
    const chatbotState = state.chatbot;
    saveThunkChatbotToIDB(chatbotState);
    dispatch(
      chatbotReducer.actions.removeReaction({
        reactionForRemoving: reactionForRemoving,
      })
    );
  };

  export const thunkEditAnswer =
  ({ reactionName, newAnswer }: { reactionName: string, newAnswer: string }) =>
  (dispatch: AppDispatch, getState: typeof store.getState) => {
    const state = getState();
    const chatbotState = state.chatbot;
    saveThunkChatbotToIDB(chatbotState);
    dispatch(
      chatbotReducer.actions.editAnswer({ reactionName: reactionName, newAnswer: newAnswer })
    );
  };

  export const thunkHandleSettings = ( settings: IChatbot["settings"] ) => ( dispatch: AppDispatch, getState: typeof store.getState ) => {
    dispatch(chatbotReducer.actions.setSettings(settings));
    const chatbotState = getState().chatbot;
    saveThunkChatbotToIDB(chatbotState);
  }