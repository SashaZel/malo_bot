import React from "react";
import { useDispatch } from "react-redux";
import { ChatbotForm } from "./ChatbotForm";
import { getChatbotFromIDB } from "./chatbotIDB";
import { ChatbotListOfReactions } from "./ChatbotListOfReactions";
import { chatbotReducer } from "./chatbotSlice";

export const ChatbotPanel = () => {

  console.log('@ChatbotPanel');
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getChatbotState = async () => {
      const chatbotState = await getChatbotFromIDB();
      console.log("@ChatbotPanel - we have got it!", chatbotState);
      if(!chatbotState) return;
      console.log('pass first check')
      if(!chatbotState.intents || !chatbotState.reactions) return;
      console.log('pass secon check')
      dispatch(chatbotReducer.actions.setState({ newState: chatbotState }));
    };
    getChatbotState();
  }, []);

  return (
    <div>
      Hi, chatbot panel.
      <ChatbotListOfReactions />
      <ChatbotForm />
    </div>
  );
};
