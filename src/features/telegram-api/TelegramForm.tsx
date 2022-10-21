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
          <h3 className="text-lg">Write a message</h3>
          <input
            className="block border-2 w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <input type="submit" value="Send Message" className="my-button" />
      </form>
    </>
  );
}