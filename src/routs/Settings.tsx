import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
//import { saveChatbotToIDB } from "../api/IDB_API";
import { AppDispatch, RootState } from "../app/store";
import { chatbotReducer, thunkHandleSettings } from "../features/chatbot/chatbotSlice";


export const Settings = () => {

  const { t } = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const chatbotSettings = useSelector(
    (state: RootState) => state.chatbot.settings
  );
  const citCurrent = chatbotSettings.defaultAnswer.addCitationOfUserMessage;

  return (
    <div className="m-4 2xl:m-8 pb-12">
      <h2 className="text-xl font-semibold border-b-2 border-neutral-200 dark:border-neutral-700">
        {t("routs.settings.sett")}
      </h2>
      <label className="block text-lg mt-36">
        {t("routs.settings.isActive")}
        <input
          type="checkbox"
          className="hue-rotate-180 scale-150 ml-2"
          checked={chatbotSettings.isActive}
          onChange={
            // () => {
            // dispatch(
            //   chatbotReducer.actions.settingIsActive({
            //     activeChatbot: !chatbotSettings.isActive,
            //   })
            // );}
            // saveChatbotToIDB();
            () => dispatch(thunkHandleSettings({ ...chatbotSettings, isActive: !chatbotSettings.isActive}))
          
        }
        />
      </label>
      <div>
        <h3 className="text-lg mt-6">{t("routs.settings.defAnsw")}</h3>
        <p className="text-neutral-500">
        {t("routs.settings.yourUsers")}
        </p>
      </div>
      <label className="block text-neutral-500">
      {t("routs.settings.addCit")}
        <input
          type="checkbox"
          className="hue-rotate-180 scale-125 ml-2"
          checked={citCurrent}
          onChange={() => {
            // dispatch(
            //   chatbotReducer.actions.settingAddCitation({
            //     addCit: !citCurrent,
            //   })
            // );
            // if (citCurrent) {
            //   dispatch(
            //     chatbotReducer.actions.settingSecondPartOfDefaultAnswer({
            //       secondPart: "",
            //     })
            //   );
            // }
            // saveChatbotToIDB();
            dispatch(thunkHandleSettings({ ...chatbotSettings, defaultAnswer: { ...chatbotSettings.defaultAnswer, addCitationOfUserMessage: !citCurrent }}))
            if (citCurrent) {
              dispatch(thunkHandleSettings({ ...chatbotSettings, defaultAnswer: { ...chatbotSettings.defaultAnswer, secondPartOfAnswer: ""}}))
            }
          }}
        />
      </label>
      <input
        type="text"
        className="inline-block mt-2 border-2 p-1 bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-500"
        style={{
          width: `${
            chatbotSettings.defaultAnswer.firstPartOfAnswer.length > 12
              ? chatbotSettings.defaultAnswer.firstPartOfAnswer.length / 2 + 2
              : 6
          }em`,
        }}
        value={chatbotSettings.defaultAnswer.firstPartOfAnswer}
        onChange={
          // (e) => {
          // dispatch(
          //   chatbotReducer.actions.settingFirstPartOfDefaultAnswer({
          //     firstPart: e.target.value,
          //   })
          // ); }
          // saveChatbotToIDB();
          (e) => dispatch(thunkHandleSettings({ ...chatbotSettings, defaultAnswer: { ...chatbotSettings.defaultAnswer, firstPartOfAnswer: e.target.value}}))
       
      }
      />
      {citCurrent && (
        <span>
          <span className="inline-block ml-1 border-2 p-1 text-neutral-500 bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-500">
            user_querry
          </span>
          <input
            type="text"
            className="inline-block ml-1 border-2 p-1 bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-500"
            style={{
              width: `${
                chatbotSettings.defaultAnswer.secondPartOfAnswer.length > 6
                  ? chatbotSettings.defaultAnswer.secondPartOfAnswer.length /
                      2 +
                    2
                  : 3
              }em`,
            }}
            value={chatbotSettings.defaultAnswer.secondPartOfAnswer}
            onChange={(e) => {
              // dispatch(
              //   chatbotReducer.actions.settingSecondPartOfDefaultAnswer({
              //     secondPart: e.target.value,
              //   })
              // );
              dispatch(thunkHandleSettings({ ...chatbotSettings, defaultAnswer: { ...chatbotSettings.defaultAnswer, secondPartOfAnswer: e.target.value}}))
            }}
          />
        </span>
      )}
    </div>
  );
};
