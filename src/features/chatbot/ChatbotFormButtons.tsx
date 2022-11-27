import React from "react";

export const ChatbotFormButtons: React.FC<{
  handleAddButtons: (s: string) => void;
}> = ({ handleAddButtons }) => {

  //console.log("@ChatbotFormButtons");

  const [firstButton, setFirstButton] = React.useState("");
  const [secondButton, setSecondButton] = React.useState("");
  const [thirdButton, setThirdButton] = React.useState("");
  const [forthButton, setForthButton] = React.useState("");

  const createAndSendMarkup = ({
    first = firstButton,
    second = secondButton,
    third = thirdButton,
    forth = forthButton,
  }) => {
    let markupFromInputs = "";

    if (first || second || third || forth) {
      markupFromInputs = `{"keyboard":[${[first, second, third, forth]
        .filter((buttonText) => buttonText !== "")
        .map((buttonText) => '["' + buttonText + '"]')
        .join(",")}],"resize_keyboard":true,"one_time_keyboard":true}`;
    }

    handleAddButtons(markupFromInputs);

  };

  return (
    <div>
      
     
          <form>
            <input
              type="text"
              onChange={(e) => {
                setFirstButton(e.target.value);
                createAndSendMarkup({ first: e.target.value });
              }}
              value={firstButton}
              className="block border-2 border-neutral-400 my-1 p-2 bg-lime-200 max-w-xl text-center text-neutral-700"
            />
            <input
              type="text"
              onChange={(e) => {
                setSecondButton(e.target.value);
                createAndSendMarkup({ second: e.target.value });
              }}
              value={secondButton}
              className="block border-2 border-neutral-400 my-1 p-2 bg-lime-200 max-w-xl text-center text-neutral-700"
            />
            <input
              type="text"
              onChange={(e) => {
                setThirdButton(e.target.value);
                createAndSendMarkup({ third: e.target.value });
              }}
              value={thirdButton}
              className="block border-2 border-neutral-400 my-1 p-2 bg-lime-200 max-w-xl text-center text-neutral-700"
            />
            <input
              type="text"
              onChange={(e) => {
                setForthButton(e.target.value);
                createAndSendMarkup({ forth: e.target.value });
              }}
              value={forthButton}
              className="block border-2 border-neutral-400 my-1 p-2 bg-lime-200 max-w-xl text-center text-neutral-700"
            />
          </form>
        </div>

  );
};
