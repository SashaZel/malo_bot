import React from "react";
import { entries, setMany, clear } from "idb-keyval";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { telegramReducer } from "./telegramSlice";

export const SaveButton = () => {
  const [readyForClear, setReadyForClear] = React.useState(false);

  const dispatch = useDispatch();
  const telegramAppState = useSelector((state: RootState) => state.telegram);

  React.useEffect(() => {
    entries()
      .then((entries) => {
        //console.log("idb entries ", entries);
        entries.map(([IDBKey, IDBValue]) => {
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
      })
      .catch((error) =>
        console.log('Fail to save state of app in IDB in "SaveButton"', error)
      );
  }, []);

  React.useEffect(() => {
    const intervalID = setInterval(handleSave, 60000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const handleSave = () => {
    console.log("run handleSave IDB");
    setMany([
      ["idb-account_data", telegramAppState.account_data],
      ["idb-chats", telegramAppState.chats],
      ["idb-current_chat", telegramAppState.current_chat],
      ["idb-messages", telegramAppState.messages],
    ]).catch((error) =>
      console.log('Error in setMany to IDB in "SaveButton" ', error)
    );
  };

  const handleClear = () => {
    clear();
    setReadyForClear(false);
    dispatch(telegramReducer.actions.clearAndExit())
  }

  return (
    <div>
      <div className={`fixed ${
          !readyForClear && "hidden"
        } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
        <div className="w-full text-right absolute right-2 top-2">
        <button
          onClick={() => setReadyForClear(false)}
          className="text-red-600 font-bold text-xl p-2"
        >
          X
        </button>
      </div>
      <div
        className='text-center p-10 bg-white border-4 border-red-600'
      >
        <p>Are you sure to Log out?</p>
        <p className="text-red-600 text-lg font-semibold text-center">
          IMPORTANT!!!
        </p>
        <p>All chat data will be lost and IndexedDB will clear up</p>
        <button
          onClick={handleClear}
          className="border-2 mt-2 p-2 border-red-600 bg-slate-200 hover:bg-slate-300">
          YES. Clear data and log out.
        </button>
      </div>
      </div>
      
      <button onClick={handleSave} className="my-button">
        Save before exit
      </button>
      <button 
        onClick={() => setReadyForClear(true)}
        className="my-button"
      >
        Clear IndexedDB and Log out.
      </button>
    </div>
  );
};
