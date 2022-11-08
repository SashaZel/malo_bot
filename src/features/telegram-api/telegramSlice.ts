import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  unread_msg?: number;
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

// const INITIAL_CHAT: IChat = {
//   id: 5122222407,
//   first_name: "Al",
//   last_name: "Zel",
//   username: "sasha_zelenkov",
//   unread_msg: 0,
// };

// const INITIAL_CHAT_2: IChat = {
//   id: 5122222408,
//   first_name: "Nikolay",
//   last_name: "Zelllenkov",
//   username: "kolya_zelenkov",
//   unread_msg: 3,
// };

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
      action: PayloadAction<{ message: IMessage; markup: string; update_id: number }>
    ): void => {
      const messageReadyForAdd = action.payload.message;
      const markupReadyForAdd = action.payload.markup;
      if (markupReadyForAdd) {
        messageReadyForAdd.text = messageReadyForAdd.text + "??reply_markup=" + markupReadyForAdd;
      }
      state.messages.push(messageReadyForAdd);
      if (action.payload.update_id !== 0) {
        state.account_data.update_id = action.payload.update_id + 1;
      }
    },
    addChatToChats: (state, action: PayloadAction<IChat>): void => {
      if (
        state.chats.map((chat: IChat) => chat.id).includes(action.payload.id)
      ) {
        return;
      }
      state.chats.push(action.payload);
    },
    setCurrentChat: (state, action: PayloadAction<IChat>): void => {
      state.current_chat = action.payload;
    },
    setLastReaction: (
      state,
      action: PayloadAction<{ chatID: number; lastReactionForThisChat: string;}>
    ): void => {
      state.chats = state.chats.map((chat) => {
        if (chat.id === action.payload.chatID) {
          return ({
            ...chat,
            lastReaction: action.payload.lastReactionForThisChat
          });
        }
        return chat;
      });
    },
    setAllMessages: (state, action: PayloadAction<IMessage[]>): void => {
      state.messages = action.payload;
    },
    setAllChats: (state, action: PayloadAction<IChat[]>): void => {
      state.chats = action.payload;
    },
    clearAndExit: (state) => {
      state.account_data = INITIAL_STATE.account_data;
    },
  },
});
