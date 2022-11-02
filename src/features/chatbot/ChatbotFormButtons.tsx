import React from "react";

export const ChatbotFormButtons: React.FC<{
  handleAddButtons: (s: string) => void;
}> = ({ handleAddButtons }) => {
  //console.log("@ChatbotFormButtons render");

  const [showButtonsMenu, setShowButtonsMenu] = React.useState(false);
  const [firstButton, setFirstButton] = React.useState("");
  const [secondButton, setSecondButton] = React.useState("");
  const [thirdButton, setThirdButton] = React.useState("");

  const handleCheckboxChange = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    //console.log("@Checkbox ", e);
    setShowButtonsMenu(e.target.checked);
    setFirstButton("");
    setSecondButton("");
    setThirdButton("");
  };

  // TODO: Refactor this component without useEffect. May be with three functions of handling onChange input

  React.useEffect(() => {
    let markupFromInputs = "";

    if (firstButton || secondButton || thirdButton) {
      markupFromInputs = `{"keyboard":[${
        [firstButton, secondButton, thirdButton]
          .filter((buttonText) => buttonText !== "")
          .map((buttonText) => '["' + buttonText + '"]')
          .join(",")
        }],"resize_keyboard":true,"one_time_keyboard":true}`;
      //console.log("@ChatbotFormButtons ", markupFromInputs);
    }

    handleAddButtons(markupFromInputs);
  }, [firstButton, secondButton, thirdButton]);

  //handleAddButtons('aaa');

  return (
    <div>
      <form>
        <label>
          <input type="checkbox" onChange={(e) => handleCheckboxChange(e)} />
          Add Buttons
        </label>
      </form>
      {showButtonsMenu && (
        <div>
          <form>
            <input
              type="text"
              onChange={(e) => setFirstButton(e.target.value)}
              value={firstButton}
              className="block border-2 border-rose-300 my-1 p-2 bg-pink-200 max-w-xl text-center"
            />
            <input
              type="text"
              onChange={(e) => setSecondButton(e.target.value)}
              value={secondButton}
              className="block border-2 border-rose-300 my-1 p-2 bg-pink-200 max-w-lg text-center"
            />
            <input
              type="text"
              onChange={(e) => setThirdButton(e.target.value)}
              value={thirdButton}
              className="block border-2 border-rose-300 my-1 p-2 bg-pink-200 max-w-lg text-center"
            />
          </form>
        </div>
      )}
    </div>
  );
};
