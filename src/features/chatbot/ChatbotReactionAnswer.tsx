import React from "react";
import { splitTextAndMarkup } from "./inputListener";

export const ChatbotReactionAnswer: React.FunctionComponent<{answer: string}> = ({answer}) => {
  
  const { text, markup } = splitTextAndMarkup(answer);

  let markupReadyForDisplay = null;

  if (markup) {
    const markupParsed = JSON.parse(markup);
    // console.log("@ChatbotReactionAnswer markup ", markup);
    // console.log("@ChatbotReactionAnswer JSON.parse ", markupParsed);
    if (markupParsed.keyboard) {
      markupReadyForDisplay = markupParsed.keyboard.map((rowOfButtons: string[], indexY: number) => {
        const buttonsInRow = rowOfButtons.length;
        return (
          <div key={String(rowOfButtons) + indexY}>{
            rowOfButtons.map((btnElement, indexX) => (
              <span 
                key={btnElement + indexX + indexY}
                className="inline-block p-1 m-1 bg-lime-200 text-center"
                style={{"width": `${300 / buttonsInRow - 4*(buttonsInRow-1)}px`}}
              >
                {btnElement}
              </span>
            ))
          }
          </div>
        );
      });
    }
  }

  return (
    <div className="my-1 border-t-2 border-b-2">
        <h4 className="font-semibold">Answer: </h4>
        <div>&quot;{text}&quot;</div>
        <div>{markupReadyForDisplay}</div>
    </div>
  )
}