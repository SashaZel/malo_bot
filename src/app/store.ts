import { configureStore } from "@reduxjs/toolkit";
import { chatbotReducer } from "../features/chatbot/chatbotSlice";
import { telegramReducer } from "../features/telegram/telegramSlice";

export const store = configureStore({
  reducer: {
    telegram: telegramReducer.reducer,
    chatbot: chatbotReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
