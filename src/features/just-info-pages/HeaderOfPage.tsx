import React from "react";
import classes from "./headerOfPage.module.css";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useTranslation } from "react-i18next";

export const HeaderOfPage: React.FC<{
  handleDarkMode: (isDark: boolean) => void;
}> = ({ handleDarkMode }) => {

  const { i18n } = useTranslation();

  const handleChangeLang = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex">
      <div className="w-3/12"></div>
      <header className="w-9/12">
        <div className="flex align-right pr-4 2xl:pr-12">
          <div className="ml-auto flex">
            <div>
              <button 
                onClick={handleChangeLang}
                className="inline-block mt-4 text-2xl font-bold text-neutral-500 dark:text-lime-300"
              >{i18n.language === "ru" ? "ENG" : "РУССКИЙ"}</button>
            </div>
            <div>
              <span className="inline-block mx-2 font-semibold text-neutral-500">
                <LightMode />
              </span>
              <label className={classes.switch}>
                <input
                  onChange={(e) => handleDarkMode(e.target.checked)}
                  type="checkbox"
                />
                <span className={classes.slider}></span>
              </label>{" "}
              <span className="inline-block mx-1 font-semibold text-neutral-500">
                <DarkMode />
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
