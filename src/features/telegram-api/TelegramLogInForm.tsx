import React from "react";

export const TelegramLogInForm: React.FC<{
  handleLogin: (e: React.SyntheticEvent) => void;
  loginStatus: string;
  connectError: string | null;
}> = ({ handleLogin, loginStatus, connectError }) => {
  return (
    <div className="my-3 pt-9 px-2 md:px-4 bg-indigo-50 rounded-xl shadow-lg">
      <h2 className="m-1 lg:m-2 text-xl font-semibold border-b-2">
        Frontend-only Telegram chatbot
      </h2>
      <p className="mx-2 pt-2">
        No-coding chatbot. Just add an answer and keywords. Your bot is ready!
      </p>
      <p className="mx-2 pt-2">
        No backend needs. Chatbot lives on your machine. Keep your browser open.
        To quit chatbot just close the browser.
      </p>
      <p className="mx-2 pt-2">
        All changes save automaticly. Open this page again - and your chatbot is
        ready again with full history available.
      </p>
      <h3 className="text-xl ml-2 pt-4">
        {loginStatus !== "login_waiting" ? "Please Log in:" : "Waiting..."}
      </h3>
      <div className={`m-1 p-2 border-2 ${connectError && "border-red-300"}`}>
        <p className="text-red-500">{connectError}</p>
        <form onSubmit={(e: React.SyntheticEvent) => handleLogin(e)}>
          <label>
            <p>Bot username:</p>
            <input className="border-2 w-full" />
          </label>
          <label>
            <p>Token:</p>
            <input className="border-2 w-full" />
          </label>
          <input type="submit" value="Log In" className="my-button" />
        </form>
      </div>
      <div>
        <h4 className="text-lg font-semibold mx-2 mt-4">
          How to get bot username and token?
        </h4>
        <p className="mx-2 mt-2">Get username and token from @BotFather.</p>
        <p className="mx-2 mb-4">
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
