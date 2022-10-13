import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter/counterSlice";
import { telegramReducer } from "../features/telegram-api/telegramSlice";
import { todosReducer } from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
    todos: todosReducer.reducer,
    telegram: telegramReducer.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
