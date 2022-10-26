import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Ifunction } from "../../common/types";

export const TelegramForm: React.FC<{handleSendMessage: Ifunction}> = ({handleSendMessage}) => {

  const [ text, setText ] = React.useState('');
  const accountData = useSelector((state: RootState) => state.telegram.account_data);
  const currentChat = useSelector((state: RootState) => state.telegram.current_chat);

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!currentChat) {
      setText('No available chats');
      return;
    }
    handleSendMessage(e.target[0].value, accountData, currentChat);
    setText('');
  }

  return (
    <>
      <form className="text-right" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <h3 className="text-xl mt-4 mb-2 text-yellow-100 ">Write a message</h3>
          <input
            className="block rounded-lg w-full p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Send Message" className="bg-gradient-to-br from-yellow-300 to-lime-200 hover:hue-rotate-30 p-2 rounded-xl my-2 shadow-xl" />
      </form>
    </>
  );
}