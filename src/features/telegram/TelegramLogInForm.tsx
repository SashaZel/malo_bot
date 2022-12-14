import React from "react";
import { useTranslation } from "react-i18next";

export const TelegramLogInForm: React.FC<{
  handleLogin: (e: React.SyntheticEvent) => void;
  loginStatus: string;
  connectError: string | null;
}> = ({ handleLogin, loginStatus, connectError }) => {

  const {t} = useTranslation();
  
  return (
    <div className="my-3 bg-neutral-100 dark:bg-neutral-800">
      <h3 className="text-xl ml-2">
        {loginStatus !== "login_waiting" ? "Please Log in:" : "Waiting..."}
      </h3>
      <div
        className={`p-2 border-2 ${
          connectError ? "border-red-400 dark:border-red-800" : "border-neutral-100 dark:border-neutral-800"
        }`}
      >
        <p className="text-red-600">{connectError}</p>
        <form onSubmit={(e: React.SyntheticEvent) => handleLogin(e)}>
          <label>
            <p>{t('routs.root.botUsername')}</p>
            <input className="border-2 w-full dark:text-neutral-800 dark:bg-neutral-200" />
          </label>
          <label>
            <p>{t('routs.root.token')}</p>
            <input className="border-2 w-full dark:text-neutral-800 dark:bg-neutral-200" />
          </label>
          <input
            type="submit"
            value="Log In"
            className="mt-2 py-1 px-6 font-semibold bg-orange-600 hover:bg-red-600 rounded-md"
          />
        </form>
      </div>
      <div>
        <h4 className="text-sm font-semibold mx-2">
        {t('routs.root.howToGet')}
        </h4>
        <p className="text-sm mx-2 text-neutral-500">
        {t('routs.root.getUsername')}
        </p>
        <p className="text-sm mx-2 text-neutral-500">
        {t('routs.root.seeDetailed')}
          <a
            className="underline"
            href="https://core.telegram.org/bots/features#botfather"
            target="blank"
          >
            {t('routs.root.here')}
          </a>
        </p>
      </div>
    </div>
  );
};
