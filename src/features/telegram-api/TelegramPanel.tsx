import React from "react";
import axios from "axios";
import { entries, get, set } from "idb-keyval";
import { useDispatch, useSelector } from "react-redux";
import { ChooseUser } from "./ChooseUser";
import { MessagesList } from "./MessagesList";
import { TelegramAPI } from "./TelegramAPI";
import { IAccount, telegramReducer } from "./telegramSlice";
import { SaveButton } from "./SaveButton";
import { RootState } from "../../app/store";

type LoginStatus = "login_yes" | "login_no" | "login_waiting";

export const TelegramPanel = () => {
  //console.log("@TelegramPanel");

  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: RootState) => state.telegram.account_data
  );
  const [loginStatus, setLoginStatus] = React.useState<LoginStatus>("login_no");
  const [wrongLogin, setWrongLogin] = React.useState(false);

  React.useEffect(() => {
    get("idb-account_data").then((IDBaccountData: IAccount) => {
      if (!IDBaccountData) return;
      checkLogin(IDBaccountData, true);
    });
  }, []);

  const checkLogin = (accountData: IAccount, loadFromIDB: boolean) => {
    setLoginStatus("login_waiting");
    axios
      .get(`https://api.telegram.org/bot${accountData.bot_token}/getMe`)
      .then((response) => {
        //console.log("@checkLogin ", response.data);
        if (response.data.ok && !loadFromIDB) {
          set("idb-account_data", accountData).catch((error) =>
            console.error("set idb-account_data failed", error)
          );
          dispatch(telegramReducer.actions.setAccountData(accountData));
          setLoginStatus("login_yes");
        }
        if (response.data.ok && loadFromIDB) {
          entries()
            .then((entries) => {
              //console.log("idb entries ", entries);
              entries.map(([IDBKey, IDBValue]) => {
                if (IDBKey === "idb-account_data") {
                  dispatch(telegramReducer.actions.setAccountData(IDBValue))
                }
                if (IDBKey === "idb-messages") {
                  dispatch(telegramReducer.actions.setAllMessages(IDBValue));
                }
                if (IDBKey === "idb-chats") {
                  dispatch(telegramReducer.actions.setAllChats(IDBValue));
                }
                if (IDBKey === "idb-current_chat") {
                  dispatch(telegramReducer.actions.setCurrentChat(IDBValue));
                }
              });
              setLoginStatus("login_yes");
            })
            .catch((error) =>
              console.log(
                'Fail to save state of app in IDB in "SaveButton"',
                error
              )
            );
        }
        if (!response.data.ok) {
          setLoginStatus("login_no");
        }
      })
      .catch((error) => {
        console.error("checkLogin error: ", error);
        setWrongLogin(true);
        setLoginStatus("login_no");
      });
  };

  const handleLogin = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    //console.log("@login 0 _ ", e.target[0].value);
    //TODO: Add check of input data
    const newAccountData: IAccount = {
      bot_name: e.target[0].value,
      bot_token: e.target[1].value,
      update_id: 0,
    };
    checkLogin(newAccountData, false);
  };

  if (loginStatus === "login_yes" && currentAccount.bot_name) {
    return (
      <>
        <SaveButton />
        <TelegramAPI />
        <ChooseUser />
        <MessagesList />
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl ml-2">Frontend-only Telegram bot</h2>
      <h3 className="text-xl ml-2">
        {loginStatus !== "login_waiting" ? "Please Log in:" : "Waiting..."}
      </h3>
      <div className={`m-1 p-2 border-2 ${wrongLogin && "border-red-300"}`}>
        <p className="text-red-500">
          {wrongLogin && "Error: Wrong Bot username or token. Try again."}
        </p>
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
        <h4 className="text-lg font-semibold">
          How to get bot username and token?
        </h4>
        <p>Get username and token from @BotFather.</p>
        <p>
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
    </>
  );
};
