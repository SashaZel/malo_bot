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
  user: string;
  update_id: number;
  last_update: number;
} 

export interface IUsers {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

export interface ITelegram {
  bot_token: string;
  bot_name: string;
  //chats: IChat[];
  messages: IMessage[];
  //users: IUsers[];
}

export const telegramReducer = createSlice({
  name: 'telegram',
  initialState: {
    bot_token: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    bot_name: 'zelenkov_test_bot',
    messages: []
  } as ITelegram,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>): void => {
      state.messages.push(action.payload)
    }
  }
});
