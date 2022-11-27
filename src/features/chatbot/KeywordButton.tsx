import React from "react";
import { useDispatch } from "react-redux";
import { saveChatbotToIDB } from "../../api/IDB_API";
import { chatbotReducer } from "./chatbotSlice";
import Close from "@mui/icons-material/Close";

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
        className=" m-1 text-red-500 p-1 pr-2 translate-x-3 -translate-y-3 dark:text-orange-500"
      ><Close fontSize="small" /></button>
    </div>
  );
}