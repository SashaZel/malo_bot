import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatbotFromIDB } from "../../api/IDB_API";
import { RootState } from "../../app/store";
import { chatbotReducer } from "./chatbotSlice";

export const ChatbotIndicator = () => {

  //console.log('@ChatbotIndicator');
  
  const chatbotIsActive = useSelector((state: RootState) => state.chatbot.settings.isActive);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getChatbotState = async () => {
      const chatbotState = await getChatbotFromIDB();
      if (!chatbotState) return;
      if (!chatbotState.intents || !chatbotState.reactions) return;
      dispatch(chatbotReducer.actions.setState({ newState: chatbotState }));
    };
    getChatbotState();
  }, []);

  if (!chatbotIsActive) {
    return <div className="text-red-500">{"Chatbot disabled (check Settings)"}</div>
  }

  return null;
  
}