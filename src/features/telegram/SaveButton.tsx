import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { telegramReducer } from "../../app/telegramSlice";
import { clearIDB, deleteAccountDataIDB } from "../../api/IDB_API";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Close from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

export const SaveButton = () => {
  //console.log("@SaveButton");

  const { t } = useTranslation();

  const [readyForClear, setReadyForClear] = React.useState(false);

  const dispatch = useDispatch();
  const telegramAppState = useSelector((state: RootState) => state.telegram);

  const handleLogOut = () => {
    //FIXME: bug in log out - removing data;
    dispatch(telegramReducer.actions.logOut());
    deleteAccountDataIDB();
  };

  const handleClear = () => {
    dispatch(telegramReducer.actions.clearAndExit());
    clearIDB();
    setReadyForClear(false);
  };

  const modalForClear = (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-neutral-100 border-4 border-red-600">
      <div className="w-full text-right absolute right-2 top-2">
        <button
          onClick={() => setReadyForClear(false)}
          className="text-red-600 font-bold text-xl p-2"
        >
          <Close />
        </button>
      </div>
      <div className="text-center p-10">
        <p>{t("routs.root.areYouSure")}</p>
        <p className="text-red-600 text-lg font-semibold text-center">
          {t("routs.root.important")}
        </p>
        <p>{t("routs.root.allData")}</p>
        <button
          onClick={handleClear}
          className="border-2 mt-2 p-2 border-red-600 bg-slate-200 hover:bg-slate-300"
        >
          {t("routs.root.yes")}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal open={readyForClear} onClose={() => setReadyForClear(false)}>
        {modalForClear}
      </Modal>
      <p className="font-semibold inline-block mr-1 p-2 text-lg text-neutral-500 dark:text-neutral-400">
        {t("routs.root.yourBot")}
      </p>
      <Tooltip
        enterDelay={1000}
        followCursor
        title="Provide this link to your users. They could communicate with your chatbot via their Telegram messager."
      >
        <p className="p-2 text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400">
          <a
            href={`https://t.me/${telegramAppState.account_data.bot_name}`}
            target="blank"
          >
            https://t.me/{telegramAppState.account_data.bot_name}
          </a>
        </p>
      </Tooltip>
      <Tooltip
        enterDelay={1000}
        followCursor
        title="Log out from this chatbot. Your data will be saved and restored for the next session."
      >
        <button
          onClick={handleLogOut}
          className="p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
        >
          {t("routs.root.logOut")}
        </button>
      </Tooltip>
      <Tooltip
        enterDelay={1000}
        followCursor
        title="Log out and delete all data. Account data, chats, messages and all chatbot settings will remove without recovery option."
      >
        <button
          onClick={() => setReadyForClear(true)}
          className="p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
        >
          {t("routs.root.delAll")}
        </button>
      </Tooltip>
    </div>
  );
};
