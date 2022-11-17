import React from "react";
import { useDispatch } from "react-redux";
import { saveChatbotToIDB } from "../../api/IDB_API";
import { chatbotReducer } from "./chatbotSlice";

export const KeywordButton: React.FC<{ keyword: string }> = ({ keyword }) => {
  
  const dispatch = useDispatch()

  let keywordForDisplay = keyword;
  const lastIndexOfSlash = keyword.lastIndexOf('~');
  if (lastIndexOfSlash > 0) {
    keywordForDisplay = keyword.slice(lastIndexOfSlash + 1);
  }

  const handleDeleteKeyword = () => {
    dispatch(chatbotReducer.actions.removeIntent({ keyword: keyword}));
    saveChatbotToIDB();
  }

  return (
    <div className="border-2 rounded-lg inline-block m-1 pt-1 pl-1 shadow-sm dark:border-neutral-900 dark:bg-neutral-900">
      {keywordForDisplay} 
      <button
        onClick={() => handleDeleteKeyword()}
        className="border-2 m-1 text-xs font-bold text-red-500 bg-white rounded-lg p-1 translate-x-3 -translate-y-3 dark:bg-neutral-700 dark:border-neutral-700 dark:text-orange-500"
      >X</button>
    </div>
  );
}