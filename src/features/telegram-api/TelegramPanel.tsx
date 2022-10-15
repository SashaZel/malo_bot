import React from "react";
import axios from "axios";
import { ChooseUser } from "./ChooseUser";
import { MessagesList } from "./MessagesList";
import { TelegramAPI } from "./TelegramAPI";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { IAccount, telegramReducer } from "./telegramSlice";

type LoginStatus = "login_yes" | "login_no" | "login_waiting";

export const TelegramPanel = () => {
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = React.useState<LoginStatus>("login_no");
  const currentAccount = useSelector(
    (state: RootState) => state.telegram.account_data
  );

  const checkLogin = (accountData: IAccount) => {
    setLoginStatus("login_waiting");
    axios
      .get(`https://api.telegram.org/bot${accountData.bot_token}/getMe`)
      .then((response) => {
        console.log("@checkLogin ", response.data);
        if (response.data.ok) {
          setLoginStatus("login_yes");
          dispatch(telegramReducer.actions.setAccountData(accountData));
        }
        if (!response.data.ok) {
          setLoginStatus("login_no");
        }
      })
      .catch((error) => console.error("checkLogin error: ", error));
  };

  const handleLogin = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    console.log("@login 0 _ ", e.target[0].value);
    //TODO: Add check of input data
    const newAccountData: IAccount = {
      bot_name: e.target[0].value,
      bot_token: e.target[1].value,
      update_id: 0,
    };
    checkLogin(newAccountData);
  };

  if (loginStatus === "login_yes") {
    return (
      <>
        <TelegramAPI />
        <ChooseUser />
        <MessagesList />
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl ml-2">Frontend-only Telegram bot</h2>
      <h3 className="text-xl ml-2">{(loginStatus !== 'login_waiting') ? 'Please Log in:' : 'Waiting...'}</h3>
      <div className="m-1 p-2 border-2 border-red-300">
      <form onSubmit={(e: React.SyntheticEvent) => handleLogin(e)}>
        <label>
          <p>Bot username:</p>
          <input
            className="border-2 w-full"
          />
        </label>
        <label>
          <p>Token:</p>
          <input
            className="border-2 w-full"
          />
        </label>
        <input type="submit" value="Log In" className="my-button" />
      </form>
    </div>
      <div>
        <h4 className="text-lg font-semibold">How to get bot username and token?</h4>
        <p>Get username and token from @BotFather.</p>
        <p>See detailed guide <a className="underline" href="https://core.telegram.org/bots/features#botfather" target="blank">here</a></p>
      </div>
    </>
  );
};
