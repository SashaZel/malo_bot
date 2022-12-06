import React from "react";
import { Tooltip, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
//import { saveChatbotToIDB } from "../../api/IDB_API";
import {
  chatbotReducer,
  selectorKeywordsList,
  thunkAddIntent,
  thunkEditAnswer,
  thunkRemoveReaction,
} from "../../app/chatbotSlice";
import Close from "@mui/icons-material/Close";
import BorderColor from "@mui/icons-material/BorderColor";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { ChatbotReactionAnswer } from "./ChatbotReactionAnswer";
import { splitTextAndMarkup } from "../../utils/splitTextAndMarkup";
import { useTranslation } from "react-i18next";

export const ChatbotReaction: React.FC<{
  reactionName: string;
  answer: string;
}> = ({ reactionName, answer }) => {
  const { t } = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const keywords = useSelector((state: RootState) =>
    selectorKeywordsList(state, reactionName)
  );
  const [inputValue, setInputValue] = React.useState("");
  const [readyForRemove, setReadyForRemove] = React.useState(false);
  const [answerEditMode, setAnswerEditMode] = React.useState(false);
  const [answerInput, setAnswerInput] = React.useState(
    splitTextAndMarkup(answer)
  );
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

    if (!inputString || typeof inputString !== "string") return;
    dispatch(
      thunkAddIntent({
        keywords: inputString,
        pointerToReaction: reactionNameWithoutParent,
        parent: keywordParent,
      })
    );
    //saveChatbotToIDB();
    setInputValue("");
  };

  const handleRemoveWarning = () => {
    setReadyForRemove(true);
  };

  const handleRemoveCancel = () => {
    setReadyForRemove(false);
  };

  const handleDelReaction = () => {
    dispatch(
      thunkRemoveReaction({
        reactionForRemoving: reactionName,
      })
    );
    // dispatcher(
    //   chatbotReducer.actions.removeReaction({
    //     reactionForRemoving: reactionName,
    //   })
    // );
    // saveChatbotToIDB();
    setReadyForRemove(false);
  };

  const handleReactionAnswerEdit = () => {
    setAnswerEditMode(true);
  };

  const handleReactionEditCancel = () => {
    setAnswerEditMode(false);
  };

  const handleAnswerEdit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const answerText = e.target[0].value;

    dispatch(
      thunkEditAnswer({
        reactionName: reactionName,
        newAnswer:
          answerText +
          (answerInput.markup ? "??reply_markup=" + answerInput.markup : ""),
      })
    );
    //saveChatbotToIDB();
    setAnswerEditMode(false);
  };

  const handleEditInputChange = (e: React.BaseSyntheticEvent) => {
    setAnswerInput({ ...answerInput, text: e.target.value });
  };

  const modalWindowForEdit = (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-4 bg-neutral-100 border-2 border-black">
      <div className="flex justify-between">
        <h3 className="font-semibold">{`Edit answer for "${reactionName}" reaction.`}</h3>
        <button
          onClick={handleReactionEditCancel}
          className="block text-red-700"
        >
          <Close />
        </button>
      </div>
      <div className="text-center mt-2">
        <form onSubmit={(e: React.BaseSyntheticEvent) => handleAnswerEdit(e)}>
          <input
            value={answerInput.text}
            onChange={(e: React.BaseSyntheticEvent) => handleEditInputChange(e)}
            className="border-2 p-1 rounded-md my-2 w-full"
          />
          <button className="bg-orange-600 p-2 rounded-xl hover:bg-red-600 font-semibold">
            {t("routs.work.save", "Save Changes")}
          </button>
        </form>
      </div>
    </div>
  );

  const modalWindowForDel = (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-neutral-100 border-4 border-red-600">
      <div className="">
        <span className="font-semibold text-black border-b-2 border-neutral-400">
          {t("routs.work.remove", "Remove") +
            reactionName +
            t("routs.work.reactionAnd", "reaction and all reaction childs?")}
        </span>
        <div className="text-center mt-2">
          <button
            onClick={handleDelReaction}
            className="bg-red-600 p-4 rounded-md hover:bg-orange-600 text-white font-semibold"
          >
            {t("routs.work.remove", "Remove")}
          </button>
          <button
            onClick={handleRemoveCancel}
            className="bg-neutral-300 p-4 rounded-md text-black hover:bg-orange-600 ml-2 font-semibold dark:bg-neutral-400 dark:hover:bg-orange-600"
          >
            {t("routs.work.cancel", "Cancel")}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="relative border-2 border-cyan-800 dark:border-none dark:bg-neutral-800 rounded-bl-xl rounded-tr-xl p-2 mt-1 mr-1 mb-1"
      style={{ marginLeft: deepthInIntentTree + "em" }}
    >
      <Modal open={readyForRemove} onClose={handleRemoveCancel}>
        {modalWindowForDel}
      </Modal>
      <Modal open={answerEditMode} onClose={handleReactionEditCancel}>
        {modalWindowForEdit}
      </Modal>
      <div className="flex justify-between">
        <h4>
          <span className="font-semibold dark:text-neutral-400">
            {t("routs.work.reaction", "Reaction: ")}
          </span>
          {reactionName}
        </h4>
        <form onSubmit={(e) => handleAddNewKeyword(e)} className="block">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-2 border-neutral-200 rounded-bl-lg w-1/2 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <input
            type="submit"
            value={
              t("routs.work.addKeywords", "Add keywords") ?? "Add keywords"
            }
            className="border-2 border-neutral-200 rounded-tr-lg px-2 bg-neutral-200 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-500"
          />
        </form>
      </div>
      <ChatbotReactionAnswer answer={answer} />
      <div className="mr-5">
        <span className="font-semibold">
          {t("routs.work.keywords", "Keywords: ")}
        </span>{" "}
        {keywords}
      </div>
      <div className="absolute right-2 bottom-0 z-10 m-1 p-1 pt-2 text-neutral-500 hover:text-red-600">
        <Tooltip
          arrow
          enterDelay={500}
          title={t("routs.work.deleteThis", "Delete this chatbot reaction")}
        >
          <button onClick={handleRemoveWarning} className="w-6">
            <DeleteForever fontSize="large" />
          </button>
        </Tooltip>
      </div>
      <div className="absolute right-10 bottom-0 z-10 m-1 p-1 pt-2 text-neutral-500 hover:text-emerald-600 dark:hover:text-green-600">
        <Tooltip
          arrow
          enterDelay={500}
          title={t("routs.work.editAnsw", "Edit answer for this reaction")}
        >
          <button onClick={handleReactionAnswerEdit} className="w-6">
            <BorderColor fontSize="large" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
