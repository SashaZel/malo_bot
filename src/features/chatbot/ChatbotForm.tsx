import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ChatbotFormButtons } from "./ChatbotFormButtons";
import { saveChatbotToIDB } from "../../api/IDB_API";
import { chatbotReducer } from "./chatbotSlice";

type IinputStatus =
  | ""
  | "please write name"
  | "please write answer"
  | "please write at least one keyword"
  | "This reaction name already exist. Please choose another."
  | "One of this keyword already exist for another reaction."
  | "Please do not use tilda sign ('~') in the reactions names or keywords"
  | "Please don't include '??reply_markup=' in your answer";

export const ChatbotForm = () => {
  const dispatch = useDispatch();
  const chatbotState = useSelector((state: RootState) => state.chatbot);

  const listOfReactions = Object.keys(chatbotState.reactions).map(
    (reaction) => (
      <option key={reaction} value={reaction}>
        {reaction}
      </option>
    )
  );

  const [inputStatus, setInputStatus] = React.useState<IinputStatus>("");
  const [parentOfReaction, setParentOfReaction] = React.useState("");
  const [inputOneContent, setInputOneContent] = React.useState("");
  const [inputTwoContent, setInputTwoContent] = React.useState("");
  const [inputThreeContent, setInputThreeContent] = React.useState("");
  //const [inputButtonsContent, setInputButtonsContent] = React.useState('{"keyboard":[["buttonOne"],["buttonTwo","ButtonThree"]],"resize_keyboard":true,"one_time_keyboard":true}');
  const [inputButtonsContent, setInputButtonsContent] = React.useState("");

  const handleAddButtons = (buttonsMarkup: string) => {
    setInputButtonsContent(buttonsMarkup);
  };

  const handleNewReaction = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    console.log("@ChatbotForm handleNew reaction ", event.target[0].value);

    const newReactionParent = event.target[0].value;
    const newReactionName = event.target[1].value;
    const newRaactionAnswer = event.target[2].value;
    const newKeywords = event.target[3].value;

    if (!newReactionName || newReactionName.trim() === "") {
      setInputStatus("please write name");
      return;
    }
    if (!newRaactionAnswer || newRaactionAnswer.trim() === "") {
      setInputStatus("please write answer");
      return;
    }
    if (!newKeywords || newKeywords.trim() === "") {
      setInputStatus("please write at least one keyword");
      return;
    }
    if (chatbotState.reactions[newReactionName]) {
      setInputStatus(
        "This reaction name already exist. Please choose another."
      );
      return;
    }
    if (newReactionName.includes("~") || newKeywords.includes("~")) {
      setInputStatus(
        "Please do not use tilda sign ('~') in the reactions names or keywords"
      );
      return;
    }
    // TODO: Add checking of uniq keyword
    if (!newReactionParent && chatbotState.intents[newKeywords]) {
      setInputStatus("One of this keyword already exist for another reaction.");
      return;
    }
    if (
      newReactionParent &&
      chatbotState.intents[newReactionParent + "~" + newKeywords]
    ) {
      setInputStatus("One of this keyword already exist for another reaction.");
      return;
    }
    if (newRaactionAnswer.includes("??reply_markup=")) {
      setInputStatus("Please don't include '??reply_markup=' in your answer");
      return;
    }

    dispatch(
      chatbotReducer.actions.addReaction({
        reactionParent: newReactionParent,
        reactionName: newReactionName,
        answer: newRaactionAnswer,
        buttonMarkup: inputButtonsContent,
      })
    );
    dispatch(
      chatbotReducer.actions.addIntent({
        keywords: newKeywords,
        pointerToAction: newReactionName,
        parent: newReactionParent,
      })
    );

    saveChatbotToIDB();

    setInputStatus("");
    setParentOfReaction("");
    setInputOneContent("");
    setInputTwoContent("");
    setInputThreeContent("");
    //setInputButtonsContent("");
  };

  return (
    <div className="p-2 m-1 border-2 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
      <h3 className="text-lg font-semibold">Add new reaction</h3>
      <form
        onSubmit={(event: React.BaseSyntheticEvent) => handleNewReaction(event)}
      >
        <label>
          <span className="text-neutral-600 dark:text-neutral-400 font-semibold">
            Reaction parent:
          </span>
          <select
            className="block p-1 w-full my-2 border-2 dark:border-neutral-700 dark:bg-neutral-900"
            value={parentOfReaction}
            onChange={(e) => setParentOfReaction(e.target.value)}
          >
            <option value=""></option>
            {listOfReactions}
          </select>
        </label>
        <label>
          <span className="text-neutral-600 dark:text-neutral-400 font-semibold">
            Reaction name:
          </span>
          <input
            type="text"
            value={inputOneContent}
            onChange={(e) => setInputOneContent(e.target.value)}
            placeholder="any name for reaction"
            className="block p-1 w-full my-2 border-2 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>
        <label>
          <span className="text-neutral-600 dark:text-neutral-400 font-semibold">
            Reaction answer
          </span>
          <input
            type="text"
            value={inputTwoContent}
            onChange={(e) => setInputTwoContent(e.target.value)}
            placeholder="type the answer which users get"
            className="block p-1 w-full my-2 border-2 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>
        <label>
          <span className="text-neutral-600 dark:text-neutral-400 font-semibold">
            Reaction keywords
          </span>
          <input
            type="text"
            value={inputThreeContent}
            onChange={(e) => setInputThreeContent(e.target.value)}
            placeholder="type, keywords, separated by, comma "
            className="block p-1 w-full my-2 border-2 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>

        <input
          type="submit"
          value="Add new reaction"
          className="bg-orange-600 p-4 rounded-xl hover:bg-red-600 font-semibold"
        />
        <span className="font-bold text-red-500">{inputStatus}</span>
      </form>
      <ChatbotFormButtons handleAddButtons={handleAddButtons} />
    </div>
  );
};
