import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import mainLogo from "../../assets/logos/logo_main.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectorUnreadMsgs } from "../telegram/telegramSlice";
import { useTranslation } from "react-i18next";

export const LeftColumn = (props: React.PropsWithChildren) => {
  const { t } = useTranslation();
  const unreadMessages = useSelector((state: RootState) =>
    selectorUnreadMsgs(state)
  );
  const unreadMsgIcon =
    unreadMessages === 0 ? (
      ""
    ) : (
      <span className="inline-block ml-2 px-2 bg-orange-600 text-white rounded-sm">
        {unreadMessages}
      </span>
    );

  return (
    <div className="fixed h-full w-3/12 -translate-y-14 border-r-2 border-neutral-200 dark:border-neutral-700">
      <div className="pb-2 mr-2 ml-4 2xl:ml-12">
        <Link to={"/malo_bot/"}>
          <img src={mainLogo} alt="malo_bot logo" />
        </Link>
      </div>
      <div className="h-[75%] 2xl:ml-12 flex flex-col justify-between">
        <div>
          {props.children}
          <nav>
            <ul>
              <li>
                <Link
                  to={"settings"}
                  className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                >
                  {t("routs.root.setting")}
                </Link>
              </li>
              <li>
                <Link
                  to={"about"}
                  className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                >
                  {t("routs.root.about")}
                </Link>
              </li>
              <li>
                <Tooltip enterDelay={1000} followCursor title="Documentation.">
                  <Link
                    to={"docs"}
                    className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                  >
                    {t("routs.root.docs")}
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  enterDelay={1000}
                  followCursor
                  title="Set chatbot answers, browse chats and write direct message to users."
                >
                  <Link
                    to={"work"}
                    className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                  >
                    {t("routs.root.working")}
                    {unreadMsgIcon}
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t-2 border-neutral-200 dark:border-neutral-700">
          <p className="ml-2 font-semibold text-sm mt-4 text-neutral-500 dark:text-neutral-400">
            <a href="mailto:lll555@yandex.ru" target="blank">
              {t("routs.root.alexander")}
            </a>{" "}
            2022
          </p>
        </div>
      </div>
    </div>
  );
};
