import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useTranslation } from "react-i18next";
import { thunkSendMessage } from "../../app/telegramSlice";

export const TelegramForm = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [text, setText] = React.useState("");
  const accountData = useSelector(
    (state: RootState) => state.telegram.account_data
  );
  const currentChat = useSelector(
    (state: RootState) => state.telegram.current_chat
  );

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!currentChat) {
      const textForDisplay =
        t("routs.work.noChats", "No available chats") ?? "No available chats";
      setText(textForDisplay);
      return;
    }

    dispatch(
      thunkSendMessage({
        messageText: e.target[0].value,
        account_data: accountData,
        current_chat: currentChat,
        messageMarkup: "",
      })
    );
    setText("");
  };

  return (
    <div className="fixed h-full p-4 2xl:pr-12 w-3/12 flex flex-col justify-end items-baseline pointer-events-none">
      <div className="z-40 w-full bg-gradient-to-br p-1 mb-12 rounded-bl-xl rounded-tr-xl from-teal-900 via-teal-900 to-cyan-800 shadow-2xl shadow-white pointer-events-auto dark:shadow-none">
        <form className="text-right p-2" onSubmit={(e) => handleSubmit(e)}>
          <label>
            <h3 className="text-xl mt-2 mb-2 text-white ">
              {t("routs.work.write", "Write a message")}
            </h3>
            <input
              className="block rounded-lg w-full p-2 mb-2 mt-4 dark:text-black dark:bg-neutral-200"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value={t("routs.work.send", "Send Message") ?? "Send Message"}
            className="bg-gradient-to-br from-lime-300 via-lime-400 to-lime-500 hover:hue-rotate-30 p-4 font-bold text-lg rounded-md my-2 shadow-xl dark:text-black"
          />
        </form>
      </div>
    </div>
  );
};
