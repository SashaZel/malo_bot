import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { telegramReducer } from "./telegramSlice";
import { clearIDB, deleteAccountDataIDB, saveTelegramStateToIDB } from "../../api/IDB_API";

export const SaveButton = () => {
  console.log("@SaveButton");

  const [readyForClear, setReadyForClear] = React.useState(false);

  const dispatch = useDispatch();
  const telegramAppState = useSelector((state: RootState) => state.telegram);

  //TODO: Get rid of this useEffect and save Telegram state to IDB in recive and sending message

  React.useEffect(() => {
    saveTelegramStateToIDB();
    //handleSave();
  }, [telegramAppState]);

  // const handleSave = () => {
  //   console.log("run handleSave IDB");
  //   setMany([
  //     ["idb-account_data", telegramAppState.account_data],
  //     ["idb-chats", telegramAppState.chats],
  //     ["idb-current_chat", telegramAppState.current_chat],
  //     ["idb-messages", telegramAppState.messages],
  //   ]).catch((error) =>
  //     console.log('@SaveButton => Error in setMany to IDB ', error)
  //   );
  // };

  const handleLogOut = () => {
    dispatch(telegramReducer.actions.logOut());
    deleteAccountDataIDB();
  };

  const handleClear = () => {
    dispatch(telegramReducer.actions.clearAndExit());
    clearIDB();
    setReadyForClear(false);
  };

  return (
    <div className="">
      <div
        className={`fixed ${
          !readyForClear && "hidden"
        } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="w-full text-right absolute right-2 top-2">
          <button
            onClick={() => setReadyForClear(false)}
            className="text-red-600 font-bold text-xl p-2"
          >
            X
          </button>
        </div>
        <div className="text-center p-10 bg-white border-4 border-red-600">
          <p>Are you sure to Log out?</p>
          <p className="text-red-600 text-lg font-semibold text-center">
            IMPORTANT!!!
          </p>
          <p>All chat data will be lost and IndexedDB will clear up</p>
          <button
            onClick={handleClear}
            className="border-2 mt-2 p-2 border-red-600 bg-slate-200 hover:bg-slate-300"
          >
            YES. Clear data and log out.
          </button>
        </div>
      </div>

      <span className="font-semibold inline-block mr-1">Your bot: </span>
      <p>
        <a
        href={`https://t.me/${telegramAppState.account_data.bot_name}`}
        target="blank"
        className="inline-block mr-4"
      >
        https://t.me/{telegramAppState.account_data.bot_name}
      </a>
      </p>
      
      <button
        onClick={handleLogOut}
        className="my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
      >
        Log out.
      </button>
      <button
        onClick={() => setReadyForClear(true)}
        className="my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
      >
        Clear IndexedDB and Log out.
      </button>
      <button
        onClick={handleLogOut}
        className="my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
      >
        Docs
      </button>
      <button
        onClick={handleLogOut}
        className="my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
      >
        Settings
      </button>
      <button
        onClick={handleLogOut}
        className="my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
      >
        Contact
      </button>
    </div>
  );
};
