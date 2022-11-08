import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { sendMessage } from "../../api/telegramAPI";

export const TelegramForm = () => {
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
      setText("No available chats");
      return;
    }
    sendMessage(e.target[0].value, accountData, currentChat, "");
    setText("");
  };

  return (
    <div className="fixed h-full p-4 2xl:pr-12 w-3/12 flex flex-col justify-end items-baseline">
      <div className="z-40 w-full bg-gradient-to-br p-2 mb-20 rounded-bl-xl rounded-tr-xl from-cyan-800 to-teal-900 shadow-2xl shadow-white">
      <form className="text-right p-2" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <h3 className="text-xl mt-4 mb-2 text-white ">
            Write a message
          </h3>
          <input
            className="block rounded-lg w-full p-2 mb-2 mt-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Send Message"
          className="bg-lime-300 hover:hue-rotate-30 p-4 font-bold text-lg rounded-md my-2 shadow-xl"
        />
      </form>
      </div>
    </div>
  );
};
