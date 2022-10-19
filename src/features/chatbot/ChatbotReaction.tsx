import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { saveChatbotToIDB } from "./chatbotIDB";
import { chatbotReducer, selectorKeywordsList } from "./chatbotSlice";

export const ChatbotReaction: React.FC<{
  reactionName: string;
  answer: string;
}> = ({ reactionName, answer }) => {
  
  const dispatcher = useDispatch();
  const keywords = useSelector((state: RootState) => selectorKeywordsList(state, reactionName));
  // const keywords = Object.entries(intents)
  //   .filter(([_, pointerToAction]) => pointerToAction === reactionName)
  //   .map(([keyword, _]) => keyword)
  //   .join(", ");

  const handleAddNewKeyword = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const inputString = e.target[0].value;
    //console.log(inputString);
    if (!inputString) return;
    dispatcher(chatbotReducer.actions.addIntent({ keywords: inputString, pointerToAction: reactionName}))
    setShowAddKeyword(false);
    saveChatbotToIDB();
  }
  
  const [ showAddKeyword, setShowAddKeyword ] = React.useState(false);
  const addKeywordForm = (
    <div
      className="p-2 absolute bg-stone-200 border-2"
    >
      <form
        onSubmit={(e) => handleAddNewKeyword(e)}
      >
        <input 
          type="text"
          className="border-2 w-1/2" 
        />
        <input
          type="submit"
          value='Add keywords'
          className="my-button"
        />
      </form>
      <button 
        onClick={() => setShowAddKeyword(false)}
        className="absolute right-0 top-0 p-2 border-2 border-slate-700"
      >X</button>
      <p>Add new keywords. Separated them by comma &quot;, &quot;</p>
    </div>
  )



  return (
    <div className="border-2 p-2">
      {showAddKeyword && addKeywordForm}
      <div className="flex justify-between">
        <h4>
          <span className="font-semibold">Intent: </span>
        {reactionName}
        </h4>
        <button 
          onClick={() => setShowAddKeyword(true)}
          className="mx-2 border-2 text-sm block border-slate-400 bg-slate-200 hover:bg-slate-300">
          Add new keyword
        </button>
      </div>
      <h4>
        <span className="font-semibold">Answer: </span>
        &quot;{answer}&quot;
      </h4>
      <div>
        <span className="font-semibold">Keywords:</span> {keywords}
      </div>
      <div></div>
    </div>
  );
};
