import React from "react";
import { useTranslation } from "react-i18next";
import { splitTextAndMarkup } from "./inputListener";

export const ChatbotReactionAnswer: React.FunctionComponent<{answer: string}> = ({answer}) => {

  const { t } = useTranslation();
  
  const { text, markup } = splitTextAndMarkup(answer);

  let markupReadyForDisplay = null;

  if (markup) {
    
    const markupParsed = JSON.parse(markup);

    if (markupParsed.keyboard) {
      markupReadyForDisplay = markupParsed.keyboard.map((rowOfButtons: string[], indexY: number) => {
        const buttonsInRow = rowOfButtons.length;
        return (
          <div key={String(rowOfButtons) + indexY}>{
            rowOfButtons.map((btnElement, indexX) => (
              <span 
                key={btnElement + indexX + indexY}
                className="inline-block p-1 m-1 bg-lime-200 text-center text-neutral-700"
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
    <div className="my-1 border-t-2 border-b-2 dark:border-neutral-700">
        <h4 className="font-semibold">{t("routs.work.answer", "Answer: ")}</h4>
        <div>&quot;{text}&quot;</div>
        <div>{markupReadyForDisplay}</div>
    </div>
  )
}