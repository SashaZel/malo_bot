import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { splitTextAndMarkup } from "../chatbot/inputListener";
import { IMessage } from "./telegramSlice";

export const Message: React.FC<{ message_id: number }> = ({ message_id }) => {
  const message: IMessage | undefined = useSelector((state: RootState) =>
    state.telegram.messages.find((msg) => msg.message_id === message_id)
  );

  if (!message) {
    return null;
  }

  const botName = useSelector(
    (state: RootState) => state.telegram.account_data.bot_name
  );
  const messageStyle =
    botName === message?.from?.username
      ? "ml-auto border-2 bg-neutral-200 text-neutral-800 rounded-l-2xl rounded-tr-2xl text-right dark:bg-black dark:text-neutral-100 dark:border-neutral-700"
      : "bg-neutral-700 text-neutral-100 rounded-r-2xl rounded-tl-2xl";

  const { text, markup } = splitTextAndMarkup(message.text);
  let markupReadyForDisplay = null;
  if (markup) {
    const markupParsed = JSON.parse(markup);
    // console.log("@ChatbotReactionAnswer markup ", markup);
    // console.log("@ChatbotReactionAnswer JSON.parse ", markupParsed);
    if (markupParsed.keyboard) {
      markupReadyForDisplay = markupParsed.keyboard.map(
        (rowOfButtons: string[], indexY: number) => {
          const buttonsInRow = rowOfButtons.length;
          return (
            <div key={String(rowOfButtons) + indexY}>
              {rowOfButtons.map((btnElement, indexX) => (
                <span
                  key={btnElement + indexX + indexY}
                  className="inline-block bg-neutral-300 text-xs text-center text-neutral-700"
                  style={{
                    width: `${100 / buttonsInRow - 4 * (buttonsInRow - 1)}px`,
                  }}
                >
                  {btnElement}
                </span>
              ))}
            </div>
          );
        }
      );
    }
  }

  const timeInUTC = new Date(0, 0, 0, 0, 0, Number(message.date));
  const localTime = new Date(
    timeInUTC.getTime() - timeInUTC.getTimezoneOffset() * 60 * 1000
  );

  return (
    <div className="w-full">
      <div className={`w-fit max-w-xs my-1 p-3 ${messageStyle}`}>
        <div>{text}</div>
        <div className="max-w-xs">{markupReadyForDisplay}</div>
        <span className="text-neutral-400 inline-block dark:text-lime-400">
          {` ${String(localTime.getHours()).padStart(2, "0")}:${String(
            localTime.getMinutes()
          ).padStart(2, "0")}`}
        </span>
      </div>
    </div>
  );
};
