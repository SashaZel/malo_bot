import React from "react";
import classes from "./headerOfPage.module.css";

export const HeaderOfPage: React.FC<{
  handleDarkMode: (isDark: boolean) => void;
}> = ({ handleDarkMode }) => {
  return (
    <div className="flex">
      <div className="w-3/12">
        
      </div>
      <header className="w-9/12">
        <div className="flex justify-between p-4 2xl:pr-12">
        <div>This is header</div>
        <div>
          Light
          <label className={classes.switch}>
            <input
              onChange={(e) => handleDarkMode(e.target.checked)}
              type="checkbox"
            />
            <span className={classes.slider}></span>
          </label>{" "}
          Dark
        </div>
        </div>
        
      </header>
    </div>
  );
};
