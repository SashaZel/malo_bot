import React from "react";
import { useDispatch } from "react-redux";
import { ChatbotForm } from "./ChatbotForm";
import { getChatbotFromIDB } from "../../api/IDB_API";
import { ChatbotListOfReactions } from "./ChatbotListOfReactions";
import { chatbotReducer } from "./chatbotSlice";

export const ChatbotPanel = () => {
  console.log("@ChatbotPanel");
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getChatbotState = async () => {
      const chatbotState = await getChatbotFromIDB();
      //console.log("@ChatbotPanel - we have got it!", chatbotState);
      if (!chatbotState) return;
      if (!chatbotState.intents || !chatbotState.reactions) return;
      dispatch(chatbotReducer.actions.setState({ newState: chatbotState }));
    };
    getChatbotState();
  }, []);

  return (
    <div className="w-6/12">
      <div className="m-4 2xl:m-8">
        <h2 className="m-1 lg:m-2 text-xl font-semibold border-b-2">
          Chatbot admin panel
        </h2>
        <p className="mx-2">Manage your chatbot.</p>
        <p className="mx-2">
          Add or remove your responses and keywords for responses.
        </p>
        <p className="mx-2">All changes will be saved automaticly.</p>
        <ChatbotForm />
        <ChatbotListOfReactions />
      </div>
    </div>
  );
};
