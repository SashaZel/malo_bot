import React from "react";
import { useDispatch } from "react-redux";
import { saveChatbotToIDB } from "./chatbotIDB";
import { chatbotReducer } from "./chatbotSlice";

export const KeywordButton: React.FC<{ keyword: string }> = ({ keyword }) => {
  
  const dispatch = useDispatch()

  const handleDeleteKeyword = () => {
    dispatch(chatbotReducer.actions.removeIntent({ keyword: keyword}));
    saveChatbotToIDB();
  }

  return (
    <div className="border-2 inline-block m-1 p-1">
      {keyword} 
      <button
        onClick={() => handleDeleteKeyword()}
        className="border-2 m-1 text-xs font-bold text-red-800 rounded-lg p-1"
      >X</button>
    </div>
  );
}