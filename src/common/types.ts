import { IAccount, IChat } from "../features/telegram-api/telegramSlice";

export type Ifunction = (
  messageText: string,
  account_data: IAccount,
  current_chat: IChat,
  messageMarkup: string
) => void;


export interface IParamsForSend {
  chat_id: number;
  text: string;
  reply_markup?: string;
}

export interface IAnswer {
  text: string;
  markup: string;
}