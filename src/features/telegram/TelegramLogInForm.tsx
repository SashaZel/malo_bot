import React from "react";

export const TelegramLogInForm: React.FC<{
  handleLogin: (e: React.SyntheticEvent) => void;
  loginStatus: string;
  connectError: string | null;
}> = ({ handleLogin, loginStatus, connectError }) => {
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
            <p>Bot username:</p>
            <input className="border-2 w-full dark:text-neutral-800 dark:bg-neutral-200" />
          </label>
          <label>
            <p>Token:</p>
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
          How to get bot username and token?
        </h4>
        <p className="text-sm mx-2 text-neutral-500">
          Get username and token from @BotFather.
        </p>
        <p className="text-sm mx-2 text-neutral-500">
          See detailed guide{" "}
          <a
            className="underline"
            href="https://core.telegram.org/bots/features#botfather"
            target="blank"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
};
