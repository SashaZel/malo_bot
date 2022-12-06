import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "./store";
import { saveThunkTelegramStateToIDB } from "../api/IDB_API";
import { sendThunkMessage } from "../api/telegramAPI";
import { splitTextAndMarkup } from "../utils/splitTextAndMarkup";
import { IChatbot } from "./chatbotSlice";

export interface IMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
  };
  chat: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: string;
  };
  date: number;
  text: string;
}

export interface IChat {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  lastReaction: string;
  date_of_last_display: number;
}

export interface IAccount {
  bot_token: string;
  bot_name: string;
  update_id: number;
}

export interface ITelegram {
  account_data: IAccount;
  current_chat: IChat | null;
  chats: IChat[];
  messages: IMessage[];
}

const INITIAL_STATE: ITelegram = {
  account_data: {
    bot_token: "",
    bot_name: "",
    update_id: 0,
  },
  current_chat: null,
  chats: [],
  messages: [],
};

export const telegramReducer = createSlice({
  name: "telegram",
  initialState: INITIAL_STATE,
  reducers: {
    setAccountData: (state, action: PayloadAction<IAccount>): void => {
      state.account_data = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        message: IMessage;
        markup: string;
        update_id: number;
      }>
    ): void => {
      const messageReadyForAdd = action.payload.message;
      const markupReadyForAdd = action.payload.markup;
      if (markupReadyForAdd) {
        messageReadyForAdd.text =
          messageReadyForAdd.text + "??reply_markup=" + markupReadyForAdd;
      }
      state.messages.push(messageReadyForAdd);
      if (action.payload.update_id !== 0) {
        state.account_data.update_id = action.payload.update_id + 1;
      }
    },
    addChatToChats: (state, action: PayloadAction<IChat>): void => {
      const chatCandidat = action.payload;
      if (state.chats.map((chat: IChat) => chat.id).includes(chatCandidat.id)) {
        return;
      }
      chatCandidat.lastReaction = "";
      state.chats.push(action.payload);
    },
    setCurrentChat: (state, action: PayloadAction<IChat | null>): void => {
      if (!action.payload) {
        return;
      }
      state.current_chat = action.payload;
    },
    setLastReaction: (
      state,
      action: PayloadAction<{ chatID: number; lastReactionForThisChat: string }>
    ): void => {
      state.chats = state.chats.map((chat) => {
        if (chat.id === action.payload.chatID) {
          return {
            ...chat,
            lastReaction: action.payload.lastReactionForThisChat,
          };
        }
        return chat;
      });
    },
    setLastDateOfDisplay: (
      state,
      action: PayloadAction<{ chatID: number; lastDateOfDisplay: number }>
    ) => {
      state.chats.forEach((chat) => {
        if (chat.id === action.payload.chatID) {
          chat.date_of_last_display = action.payload.lastDateOfDisplay;
        }
      });
    },
    setAllMessages: (state, action: PayloadAction<IMessage[]>): void => {
      if (action.payload.length === 0) {
        return;
      }
      state.messages = action.payload;
    },
    setAllChats: (state, action: PayloadAction<IChat[]>): void => {
      if (action.payload.length === 0) {
        return;
      }
      state.chats = action.payload;
    },
    logOut: (state) => {
      state.account_data = INITIAL_STATE.account_data;
    },
    clearAndExit: (state) => {
      state.account_data = INITIAL_STATE.account_data;
      state.chats = INITIAL_STATE.chats;
      state.current_chat = INITIAL_STATE.current_chat;
      state.messages = INITIAL_STATE.messages;
    },
  },
});

export const selectorIsLoggedIn = (state: RootState): boolean => {
  if (
    state.telegram.account_data.bot_name &&
    state.telegram.account_data.bot_token
  ) {
    return true;
  }
  return false;
};

export const selectorChatStatus = (
  state: RootState,
  chatID: number
): { isActive: boolean; unreadMsgs: number } => {
  let thisChatIsActive = false;
  if (state.telegram?.current_chat?.id === chatID) {
    thisChatIsActive = true;
  }

  const chatLastDateOfDisplay = state.telegram.chats.find(
    (chat) => chat.id === chatID
  )?.date_of_last_display;
  const unreadMessages = state.telegram.messages.filter(
    (msg) =>
      msg.from.id === chatID &&
      chatLastDateOfDisplay !== undefined &&
      chatLastDateOfDisplay < msg.date
  ).length;

  return {
    isActive: thisChatIsActive,
    unreadMsgs: unreadMessages,
  };
};

export const selectorUnreadMsgs = (state: RootState) => {
  const botUsername = state?.telegram?.account_data?.bot_name;
  if (
    !state.telegram ||
    !botUsername ||
    !Array.isArray(state.telegram.chats) ||
    !Array.isArray(state.telegram.messages)
  ) {
    return 0;
  }
  const lastDisplayedDateList = state.telegram.chats.map(
    (chat) => chat.date_of_last_display
  );
  if (lastDisplayedDateList.length === 0) {
    return 0;
  }
  const lastDisplayedDate = Math.max(...lastDisplayedDateList);
  const messagesList = state.telegram.messages;
  if (messagesList.length === 0) {
    return 0;
  }
  const unreadMsgs = messagesList.filter(
    (msg) => msg.date > lastDisplayedDate && msg.from.username !== botUsername
  ).length;
  return unreadMsgs;
};

export const thunkSetLastTimeOfDisplay =
  (requiredChatID: number) =>
  (dispatch: AppDispatch, getState: typeof store.getState) => {
    const dateNowInSec = Math.ceil(Date.now() / 1000);
    dispatch(
      telegramReducer.actions.setLastDateOfDisplay({
        chatID: requiredChatID,
        lastDateOfDisplay: dateNowInSec,
      })
    );
    const telegramState = getState().telegram;
    saveThunkTelegramStateToIDB(telegramState);
  };

interface ISend {
  messageText: string;
  account_data: IAccount;
  current_chat: Omit<IChat, "lastReaction" | "date_of_last_display">;
  messageMarkup: string;
}

export const thunkSendMessage =
  ({ messageText, account_data, current_chat, messageMarkup }: ISend) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {
    const response = await sendThunkMessage(
      messageText,
      account_data,
      current_chat,
      messageMarkup
    );
    if (
      !response ||
      !response.data ||
      !response.data.result ||
      !response.data.result.message_id ||
      !response.data.result.from ||
      !response.data.result.chat ||
      !response.data.result.date ||
      !response.data.result.text
    ) {
      return;
    }
    const message: IMessage = {
      message_id: response.data.result.message_id,
      from: response.data.result.from,
      chat: response.data.result.chat,
      date: response.data.result.date,
      text: response.data.result.text,
    };
    dispatch(
      telegramReducer.actions.addMessage({
        message: message,
        markup: messageMarkup,
        update_id: 0,
      })
    );
    const telegramState = getState().telegram;
    saveThunkTelegramStateToIDB(telegramState);
  };

export const thunkGetAndAnswer =
  ({
    receivedMessage,
    updateID,
  }: {
    receivedMessage: IMessage;
    updateID: number;
  }) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {
    dispatch(
      telegramReducer.actions.addMessage({
        message: receivedMessage,
        markup: "",
        update_id: updateID,
      })
    );

    const chatbotState: IChatbot = getState().chatbot;
    const listOfChats: IChat[] = getState().telegram.chats;

    let lastReaction = "";
    for (let i = 0; i < listOfChats.length; i++) {
      if (listOfChats[i].id === receivedMessage.chat.id) {
        lastReaction = listOfChats[i].lastReaction;
      }
    }
    if (
      !chatbotState ||
      !chatbotState.intents ||
      !chatbotState.reactions ||
      !chatbotState.settings
    ) {
      console.error("Chatbot state is not ready! @thunkGetAndAnswer");
      return;
    }
    if (!chatbotState.settings.isActive) {
      return;
    }
    const pointerToReaction =
      chatbotState.intents[lastReaction + "~" + receivedMessage.text] ||
      chatbotState.intents[receivedMessage.text];

    let answerText = "";
    let answerMarkup = "";

    if (!pointerToReaction) {

      dispatch(
        telegramReducer.actions.setLastReaction({
          chatID: receivedMessage.chat.id,
          lastReactionForThisChat: "",
        })
      );

      answerText =
        chatbotState.settings.defaultAnswer.firstPartOfAnswer +
        (chatbotState.settings.defaultAnswer.addCitationOfUserMessage
          ? receivedMessage.text +
            chatbotState.settings.defaultAnswer.secondPartOfAnswer
          : "");
    }

    if (pointerToReaction) {

      dispatch(
        telegramReducer.actions.setLastReaction({
          chatID: receivedMessage.chat.id,
          lastReactionForThisChat: pointerToReaction,
        })
      );

      const textAndMarkup = splitTextAndMarkup(chatbotState.reactions[pointerToReaction]);
      answerText = textAndMarkup.text;
      answerMarkup = textAndMarkup.markup;
    }

    const accountData = getState().telegram.account_data;

    const response = await sendThunkMessage(
      answerText,
      accountData,
      receivedMessage.chat,
      answerMarkup
    );
    if (
      !response ||
      !response.data ||
      !response.data.result ||
      !response.data.result.message_id ||
      !response.data.result.from ||
      !response.data.result.chat ||
      !response.data.result.date ||
      !response.data.result.text
    ) {
      return;
    }
    const confirmMessage: IMessage = {
      message_id: response.data.result.message_id,
      from: response.data.result.from,
      chat: response.data.result.chat,
      date: response.data.result.date,
      text: response.data.result.text,
    };
    dispatch(
      telegramReducer.actions.addMessage({
        message: confirmMessage,
        markup: answerMarkup,
        update_id: 0,
      })
    );
    const telegramState = getState().telegram;
    saveThunkTelegramStateToIDB(telegramState);
  };
