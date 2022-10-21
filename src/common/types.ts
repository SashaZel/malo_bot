import { IAccount, IChat } from "../features/telegram-api/telegramSlice";

export type Ifunction = (messageText: string, account_data: IAccount, current_chat: IChat) => void;