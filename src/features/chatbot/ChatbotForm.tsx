import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { saveChatbotToIDB } from "./chatbotIDB";
import { chatbotReducer } from "./chatbotSlice";

type IinputStatus =
  | ""
  | "please write name"
  | "please write answer"
  | "please write at least one keyword"
  | "This reaction name already exist. Please choose another."
  | "One of this keyword already exist for another reaction."
  | "Please do not use tilda sign ('~') in the reactions names or keywords";

export const ChatbotForm = () => {
  const dispatch = useDispatch();
  const chatbotState = useSelector((state: RootState) => state.chatbot);

  const listOfReactions = Object.keys(chatbotState.reactions).map(
    (reaction) => <option key={reaction}>{reaction}</option>
  );

  const [inputStatus, setInputStatus] = React.useState<IinputStatus>("");
  const [inputOneContent, setInputOneContent] = React.useState("");
  const [inputTwoContent, setInputTwoContent] = React.useState("");
  const [inputThreeContent, setInputThreeContent] = React.useState("");

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
    if (newReactionName.includes('~') || newKeywords.includes('~')) {
      setInputStatus("Please do not use tilda sign ('~') in the reactions names or keywords");
      return;
    }
    // TODO: Add checking of uniq keyword
    if (!newReactionParent && chatbotState.intents[newKeywords]) {
      setInputStatus("One of this keyword already exist for another reaction.");
      return;
    }
    if (newReactionParent && chatbotState.intents[newReactionParent + '~' + newKeywords]) {
      setInputStatus("One of this keyword already exist for another reaction.");
      return;
    }

    dispatch(
      chatbotReducer.actions.addReaction({
        reactionName: newReactionParent
          ? newReactionParent + "~" + newReactionName
          : newReactionName,
        answer: newRaactionAnswer,
      })
    );
    dispatch(
      chatbotReducer.actions.addIntent({
        keywords: newKeywords,
        pointerToAction: newReactionName,
        parent: newReactionParent
      })
    );

    saveChatbotToIDB();

    setInputStatus("");
    setInputOneContent("");
    setInputTwoContent("");
    setInputThreeContent("");
  };

  return (
    <div className="p-2 m-1 border-2">
      <h3 className="text-lg font-semibold">Add new reaction</h3>
      <form
        onSubmit={(event: React.BaseSyntheticEvent) => handleNewReaction(event)}
      >
        <label>
          Reaction parent:
          <select className="block w-full my-2 border-2">
            <option></option>
            {listOfReactions}
          </select>
        </label>
        <label>
          Reaction name:
          <input
            type="text"
            value={inputOneContent}
            onChange={(e) => setInputOneContent(e.target.value)}
            placeholder="any name for reaction"
            className="block w-full my-2 border-2"
          />
        </label>
        <label>
          Reaction answer
          <input
            type="text"
            value={inputTwoContent}
            onChange={(e) => setInputTwoContent(e.target.value)}
            placeholder="type the answer which users get"
            className="block w-full my-2 border-2"
          />
        </label>
        <label>
          Reaction keywords
          <input
            type="text"
            value={inputThreeContent}
            onChange={(e) => setInputThreeContent(e.target.value)}
            placeholder="type, keywords, separated by, comma "
            className="block w-full my-2 border-2"
          />
        </label>

        <input type="submit" value="Add new reaction" className="my-button" />
        <span className="font-bold text-red-500">{inputStatus}</span>
      </form>
    </div>
  );
};
