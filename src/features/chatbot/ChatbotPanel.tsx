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
    <div className="p-1 md:p-2">
      <h2 className="m-1 lg:m-2 text-xl font-semibold border-b-2">Chatbot admin panel</h2>
      <p className="mx-2">Manage your chatbot.</p>
      <p className="mx-2">Add or remove your responses and keywords for responses.</p>
      <p className="mx-2">All changes will be saved automaticly.</p>
      <ChatbotForm />
      <ChatbotListOfReactions />
    </div>
  );
};
