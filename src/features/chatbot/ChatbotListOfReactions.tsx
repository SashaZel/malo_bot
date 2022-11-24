import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { selectorListOfAllReactions } from "./chatbotSlice";

export const ChatbotListOfReactions = () => {
  //console.log("@ChatbotListOfReactions");

  const reactions = useSelector((state: RootState) =>
    selectorListOfAllReactions(state)
  );

  return <div className="mt-6">{reactions}</div>;
};
