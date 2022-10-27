import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { saveChatbotToIDB } from "./chatbotIDB";
import { chatbotReducer, selectorKeywordsList } from "./chatbotSlice";
import binPicture from "../../assets/pictures/icons8-bin-60.png";
import pencilPicture from "../../assets/pictures/pencil.png";

export const ChatbotReaction: React.FC<{
  reactionName: string;
  answer: string;
}> = ({ reactionName, answer }) => {
  const dispatcher = useDispatch();
  const keywords = useSelector((state: RootState) =>
    selectorKeywordsList(state, reactionName)
  );
  const [inputValue, setInputValue] = React.useState("");
  const [readyForRemove, setReadyForRemove] = React.useState(false);
  const [answerEditMode, setAnswerEditMode] = React.useState(false);
  const [answerInput, setAnswerInput] = React.useState(answer);
  const deepthInIntentTree = reactionName.split("~").length;

  const handleAddNewKeyword = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const lastSlashSymbol = reactionName.lastIndexOf("~");
    let keywordParent = "";
    let reactionNameWithoutParent = reactionName;
    if (lastSlashSymbol > 0) {
      keywordParent = reactionName.slice(0, lastSlashSymbol);
      reactionNameWithoutParent = reactionName.slice(lastSlashSymbol + 1);
    }
    const inputString = e.target[0].value;
    //console.log(inputString);
    if (!inputString) return;
    dispatcher(
      chatbotReducer.actions.addIntent({
        keywords: inputString,
        pointerToAction: reactionNameWithoutParent,
        parent: keywordParent,
      })
    );
    saveChatbotToIDB();
    setInputValue("");
  };

  const handleRemoveWarning = () => {
    setReadyForRemove(true);
  };

  const handleRemoveCancel = () => {
    setReadyForRemove(false);
  };

  const handleDelReaction = () => {
    dispatcher(
      chatbotReducer.actions.removeReaction({
        reactionForRemoving: reactionName,
      })
    );
    saveChatbotToIDB();
    setReadyForRemove(false);
  };

  const handleReactionAnswerEdit = () => {
    setAnswerEditMode(true);
  }

  const handleReactionEditCancel = () => {
    setAnswerEditMode(false);
  }

  const handleAnswerEdit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const answer = e.target[0].value;
    console.log('@@@answer ', answer)
    dispatcher(
      chatbotReducer.actions.editAnswer({
        reactionName: reactionName,
        newAnswer: answer,
      })
    );
    saveChatbotToIDB();
    setAnswerEditMode(false);
  }

  return (
    <div
      className="relative border-2 border-pink-800 rounded-bl-xl rounded-tr-xl p-2 mt-1 mr-1 mb-1"
      style={{ marginLeft: deepthInIntentTree + "em" }}
    >
      <div
        className={`fixed ${
          !readyForRemove && "hidden"
        } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white border-4 rounded-2xl border-red-500 z-10`}
      >
        <span className="font-semibold border-b-2">{`Remove "${reactionName}" reaction and all reaction childs?`}</span>
        <div className="text-center mt-2">
          <button
            onClick={handleDelReaction}
            className="bg-pink-700 p-2 rounded-xl hover:bg-pink-600 border-2 border-pink-700 text-yellow-200"
          >
            Remove
          </button>
          <button
            onClick={handleRemoveCancel}
            className="bg-pink-200 p-2 rounded-xl border-2 border-pink-200 text-yellow-800 hover:bg-pink-300 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        className={`fixed ${
          !answerEditMode && "hidden"
        } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 p-4 bg-white border-4 rounded-2xl border-red-500 z-10`}
      >
        <div 
        className="flex justify-between"
        >
          <h3 className="font-semibold">{`Edit answer for "${reactionName}" reaction.`}</h3>
          <button
            onClick={handleReactionEditCancel}
            className="block border-2 border-red-500 p-1 rounded-md"
          >
            X
          </button>
        </div>
        <div className="text-center mt-2">
          <form
            onSubmit={(e: React.BaseSyntheticEvent) => handleAnswerEdit(e)}
          >
            <input 
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              className="border-2 p-1 rounded-md my-2 w-full"
            />
            <button className="bg-pink-700 p-2 rounded-xl hover:bg-pink-600 border-2 border-pink-700 text-yellow-200">
              Save Changes
            </button>
          </form>
        </div>
      </div>
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
            className="border-2 border-pink-200 rounded-bl-lg w-1/2"
          />
          <input
            type="submit"
            value="Add keywords"
            className="border-2 border-pink-200 rounded-tr-lg px-2 bg-pink-200 hover:border-pink-400"
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
      <div className="absolute right-0 bottom-0 z-10 m-1 p-1 pt-2 bg-white border-red-300 hover:border-red-600 rounded-xl border-2">
        <button onClick={handleRemoveWarning} className="w-6">
          <img src={binPicture} alt="del reaction" />
        </button>
      </div>
      <div className="absolute right-10 bottom-0 z-10 m-1 p-1 pt-2 bg-white border-red-300 hover:border-red-600 rounded-xl border-2">
        <button onClick={handleReactionAnswerEdit} className="w-6">
          <img src={pencilPicture} alt="edit reaction" />
        </button>
      </div>
    </div>
  );
};
