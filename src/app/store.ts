import { configureStore } from "@reduxjs/toolkit";
import { chatbotReducer } from "../features/chatbot/chatbotSlice";
import { counterReducer } from "../features/counter/counterSlice";
import { telegramReducer } from "../features/telegram-api/telegramSlice";
import { todosReducer } from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
    todos: todosReducer.reducer,
    telegram: telegramReducer.reducer,
    chatbot: chatbotReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
