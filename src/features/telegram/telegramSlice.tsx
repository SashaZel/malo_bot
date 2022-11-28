import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";

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
  (requiredChatID: number) => (dispatch: AppDispatch) => {
    const dateNowInSec = Math.ceil(Date.now() / 1000);
    dispatch(
      telegramReducer.actions.setLastDateOfDisplay({
        chatID: requiredChatID,
        lastDateOfDisplay: dateNowInSec,
      })
    );
  };
