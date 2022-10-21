import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { saveChatbotToIDB } from "./chatbotIDB";
import { chatbotReducer, selectorKeywordsList } from "./chatbotSlice";
import binPicture from "../../assets/pictures/icons8-bin-60.png";

export const ChatbotReaction: React.FC<{
  reactionName: string;
  answer: string;
}> = ({ reactionName, answer }) => {
  const dispatcher = useDispatch();
  const keywords = useSelector((state: RootState) =>
    selectorKeywordsList(state, reactionName)
  );
  const [inputValue, setInputValue] = React.useState("");
  // const keywords = Object.entries(intents)
  //   .filter(([_, pointerToAction]) => pointerToAction === reactionName)
  //   .map(([keyword, _]) => keyword)
  //   .join(", ");

  const handleAddNewKeyword = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const inputString = e.target[0].value;
    //console.log(inputString);
    if (!inputString) return;
    dispatcher(
      chatbotReducer.actions.addIntent({
        keywords: inputString,
        pointerToAction: reactionName,
      })
    );
    saveChatbotToIDB();
    setInputValue("");
  };

  const handleDelReaction = () => {
    dispatcher(
      chatbotReducer.actions.removeReaction({
        reactionForRemoving: reactionName,
      })
    );
    saveChatbotToIDB();
  };

  return (
    <div className="relative border-2 p-2 m-1">
      <div className="flex justify-between">
        <h4>
          <span className="font-semibold">Reaction: </span>
          {reactionName}
        </h4>
        <form onSubmit={(e) => handleAddNewKeyword(e)} className="block">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-2 w-1/2"
          />
          <input
            type="submit"
            value="Add keywords"
            className="border-2 px-2 bg-slate-200 hover:border-slate-400"
          />
        </form>
      </div>
      <h4>
        <span className="font-semibold">Answer: </span>
        &quot;{answer}&quot;
      </h4>
      <div className="mr-5">
        <span className="font-semibold">Keywords:</span> {keywords}
      </div>
      <div className="absolute right-0 bottom-0 z-10 m-1 p-1 bg-white border-red-300 hover:border-red-600 rounded-xl border-2">
        <button onClick={handleDelReaction} className="w-6">
          <img src={binPicture} alt="del reaction" />
        </button>
      </div>
    </div>
  );
};
