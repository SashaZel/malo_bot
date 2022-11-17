import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChooseUser } from "./ChooseUser";
import { MessagesList } from "./MessagesList";
import { TelegramListenerOfUpdates } from "./TelegramListenerOfUpdates";
import { IAccount, telegramReducer } from "./telegramSlice";
import { SaveButton } from "./SaveButton";
import { RootState } from "../../app/store";
import { ChatbotPanel } from "../chatbot/ChatbotPanel";
import { LeftColumn } from "../just-info-pages/LeftColumn";
import { TelegramForm } from "./TelegramForm";
import { checkTelegramAccount } from "../../api/telegramAPI";
import {
  getAvailableDataFromIDB,
  getInitialLoginDataFromIDB,
  saveTelegramAccountDataToIDB,
} from "../../api/IDB_API";
import { TelegramLogInForm } from "./TelegramLogInForm";

type ILoginStatus = "login_yes" | "login_no" | "login_waiting";

export const TelegramPanel = () => {
  //console.log("@TelegramPanel");

  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: RootState) => state.telegram.account_data
  );
  const [loginStatus, setLoginStatus] =
    React.useState<ILoginStatus>("login_no");
  const [connectError, setConnectError] = React.useState<null | string>(null);

  /*
  Component logic.
  -------------------------
  This component used for mounting Log-in form and checking Telegram bot token
  1. When component is mounting it checks IndexedDB if it is available Log-in data and 
    ask Telegram API if it login is valid
  2. If Login is valid this component render the working area, get another data
    from IndexedDB and set available data in Redux.
  3. If no Log-in data or Token is wrong component renders Log-in form. 
  4. Check user Log-in input.
  5. see paragraph 2 again.
  */

  React.useEffect(() => {
    const initialLoading = async () => {
      const { IDBAccountData, hasIDBError } =
        await getInitialLoginDataFromIDB();
      if (hasIDBError) {
        setConnectError(
          "Your browser do not support IndexedDB. Please use desktop or laptop PC and upgrade your browser"
        );
      }
      if (!IDBAccountData) return;
      if (!IDBAccountData.bot_name && !IDBAccountData.bot_token) return;
      checkLogin(IDBAccountData, true);
    };

    initialLoading();
  }, []);

  const checkLogin = async (accountData: IAccount, loadFromIDB: boolean) => {
    setLoginStatus("login_waiting");

    const { accountIsValid, errorInCheck } = await checkTelegramAccount(
      accountData.bot_token
    );

    if (errorInCheck || !accountIsValid) {
      setLoginStatus("login_no");
      if (
        errorInCheck instanceof Error &&
        errorInCheck.message === "Request failed with status code 404"
      ) {
        setConnectError("Wrong bot name or token");
        return;
      }
      if (errorInCheck instanceof Error) {
        setConnectError(
          "Please check Internet connection or try again. Error: " +
            errorInCheck.message
        );
        return;
      }
      setConnectError("Error in check bot name and account");
      return;
    }

    setConnectError(null);
    dispatch(telegramReducer.actions.setAccountData(accountData));
    setLoginStatus("login_yes");

    if (!loadFromIDB) {
      saveTelegramAccountDataToIDB(accountData);
    }
    if (loadFromIDB) {
      const { current_chat, chats, messages } = await getAvailableDataFromIDB();
      dispatch(telegramReducer.actions.setAllMessages(messages));
      dispatch(telegramReducer.actions.setAllChats(chats));
      dispatch(telegramReducer.actions.setCurrentChat(current_chat));
    }
  };

  const handleLogin = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      setConnectError("Please write bot name and token");
      return;
    }
    const newAccountData: IAccount = {
      bot_name: e.target[0].value,
      bot_token: e.target[1].value,
      update_id: 0,
    };
    checkLogin(newAccountData, false);
  };

  if (loginStatus === "login_yes" && currentAccount.bot_name) {
    return (
      <div>
        <LeftColumn>
          <SaveButton />
        </LeftColumn>
        <div className="flex">
          <div className="w-3/12"></div>
          <div className="w-6/12">
            <ChooseUser />
            <ChatbotPanel />
          </div>
          <div className="w-3/12">
            <TelegramListenerOfUpdates />
            <TelegramForm />
            <MessagesList />
          </div>
        </div>
      </div>
    );
  }

  return (
    <TelegramLogInForm
      handleLogin={handleLogin}
      loginStatus={loginStatus}
      connectError={connectError}
    />
  );
};
