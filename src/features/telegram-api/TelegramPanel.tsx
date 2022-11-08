import React from "react";
// TODO: Move all IDB querries to IDB_API
import { entries, get, set } from "idb-keyval";
import { useDispatch, useSelector } from "react-redux";
import { ChooseUser } from "./ChooseUser";
import { MessagesList } from "./MessagesList";
import { TelegramAPI } from "./TelegramAPI";
import { IAccount, telegramReducer } from "./telegramSlice";
import { SaveButton } from "./SaveButton";
import { RootState } from "../../app/store";
import { ChatbotPanel } from "../chatbot/ChatbotPanel";
import { LeftColumn } from "../just-info-pages/LeftColumn";
import { RightColumn } from "../just-info-pages/RightColumn";
import { TelegramForm } from "./TelegramForm";
import { checkTelegramAccount } from "../../api/telegramAPI";
import { getInitialLoginDataFromIDB } from "../../api/IDB_API";

type ILoginStatus = "login_yes" | "login_no" | "login_waiting";

export const TelegramPanel = () => {
  //console.log("@TelegramPanel");

  const dispatch = useDispatch();
  const currentAccount = useSelector(
    (state: RootState) => state.telegram.account_data
  );
  const [loginStatus, setLoginStatus] = React.useState<ILoginStatus>("login_no");
  const [wrongLogin, setWrongLogin] = React.useState(false);
  const [connectError, setConnectError] = React.useState<null | string>(null);

  React.useEffect(() => {
    
    const initialLoading = async () => {
      const {IDBAccountData, hasIDBError} = await getInitialLoginDataFromIDB();
      if (hasIDBError) {
        setConnectError(
          "Your browser do not support IndexedDB. Please use desktop or laptop PC and upgrade your browser"
        );
      }
      if (!IDBAccountData) return;
      checkLogin(IDBAccountData, true);
    }

    initialLoading();

    // get("idb-account_data")
    //   .then((IDBaccountData: IAccount) => {
    //     if (!IDBaccountData) return;
    //     checkLogin(IDBaccountData, true);
    //   })
    //   .catch((err) => {
    //     console.error("@TelegramPanel => No IDB available ", err);
    //     setConnectError(
    //       "Your browser do not support IndexedDB. Please use desktop or laptop PC and upgrade your browser"
    //     );
    //   });
  }, []);

  const checkLogin = async (accountData: IAccount, loadFromIDB: boolean) => {
    setLoginStatus("login_waiting");
    const { accountIsValid, errorInCheck } = await checkTelegramAccount(
      accountData.bot_token
    );

    setConnectError(null);
    //console.log("@checkLogin ", response.data);
    if (accountIsValid && !loadFromIDB && !errorInCheck) {
      set("idb-account_data", accountData).catch((error) =>
        console.error("@TelegramPanel set idb-account_data failed", error)
      );
      dispatch(telegramReducer.actions.setAccountData(accountData));
      setLoginStatus("login_yes");
    }
    if (accountIsValid && loadFromIDB && !errorInCheck) {
      entries()
        .then((entries) => {
          //console.log("idb entries ", entries);
          entries.map(([IDBKey, IDBValue]) => {
            if (IDBKey === "idb-account_data") {
              dispatch(telegramReducer.actions.setAccountData(IDBValue));
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
            "@TelegramPanel => fail to get saved data from IDB",
            error
          )
        );
    }
    if (!accountIsValid) {
      setLoginStatus("login_no");
    }

    if (errorInCheck) {
      setWrongLogin(true);
      setLoginStatus("login_no");
      if (errorInCheck instanceof Error) {
        setConnectError(
          errorInCheck.message +
            ". Please check Internet connection or try again."
        );
      } else {
        setConnectError("Please check Internet connection or try again.");
      }
    }
  };

  // const checkLogin = (accountData: IAccount, loadFromIDB: boolean) => {
  //   setLoginStatus("login_waiting");
  //   axios
  //     .get(`https://api.telegram.org/bot${accountData.bot_token}/getMe`)
  //     .then((response) => {
  //       setConnectError(null);
  //       //console.log("@checkLogin ", response.data);
  //       if (response.data.ok && !loadFromIDB) {
  //         set("idb-account_data", accountData).catch((error) =>
  //           console.error("@TelegramPanel set idb-account_data failed", error)
  //         );
  //         dispatch(telegramReducer.actions.setAccountData(accountData));
  //         setLoginStatus("login_yes");
  //       }
  //       if (response.data.ok && loadFromIDB) {
  //         entries()
  //           .then((entries) => {
  //             //console.log("idb entries ", entries);
  //             entries.map(([IDBKey, IDBValue]) => {
  //               if (IDBKey === "idb-account_data") {
  //                 dispatch(telegramReducer.actions.setAccountData(IDBValue));
  //               }
  //               if (IDBKey === "idb-messages") {
  //                 dispatch(telegramReducer.actions.setAllMessages(IDBValue));
  //               }
  //               if (IDBKey === "idb-chats") {
  //                 dispatch(telegramReducer.actions.setAllChats(IDBValue));
  //               }
  //               if (IDBKey === "idb-current_chat") {
  //                 dispatch(telegramReducer.actions.setCurrentChat(IDBValue));
  //               }
  //             });
  //             setLoginStatus("login_yes");
  //           })
  //           .catch((error) =>
  //             console.log(
  //               "@TelegramPanel => fail to get saved data from IDB",
  //               error
  //             )
  //           );
  //       }
  //       if (!response.data.ok) {
  //         setLoginStatus("login_no");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("@TelegramPanel checkLogin error: ", error);
  //       setWrongLogin(true);
  //       setLoginStatus("login_no");
  //       setConnectError(
  //         error.message + ". Please check Internet connection or try again."
  //       );
  //     });
  // };

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
      <div>
        <LeftColumn>
          <SaveButton />
          <ChooseUser />
        </LeftColumn>
        <div className="flex">
          <div className="w-3/12"></div>
          <header className="w-9/12">This is header</header>
        </div>
        <div className="flex">
          <div className="w-3/12"></div>
          <ChatbotPanel />
          <RightColumn>
            <TelegramAPI />
            <TelegramForm />
            <MessagesList />
          </RightColumn>
        </div>
      </div>
    );
  }

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
      <div className={`m-1 p-2 border-2 ${wrongLogin && "border-red-300"}`}>
        <p className="text-red-500">
          {connectError ||
            (wrongLogin && "Error: Wrong Bot username or token. Try again.")}
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
