import React from "react";
import { Ifunction } from "./TelegramAPI";

export const TelegramForm: React.FC<{handleSendMessage: Ifunction}> = ({handleSendMessage}) => {

  const [ text, setText ] = React.useState('');

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    handleSendMessage(e.target[0].value);
    setText('');
  }

  return (
    <>
      <form className="text-right" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <h3 className="text-lg">Write the message</h3>
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