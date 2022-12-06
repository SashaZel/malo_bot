import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { chatbotReducer } from "./chatbotSlice";
import { telegramReducer } from "./telegramSlice";

export const store = configureStore({
  reducer: {
    telegram: telegramReducer.reducer,
    chatbot: chatbotReducer.reducer,
  },
});

//for tests

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      telegram: telegramReducer.reducer,
      chatbot: chatbotReducer.reducer,
    },
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
