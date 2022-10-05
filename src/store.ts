import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/counter";
import { todosReducer } from "./reducers/todo";

export const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
    todos: todosReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
