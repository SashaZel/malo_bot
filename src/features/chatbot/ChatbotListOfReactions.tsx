import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ChatbotReaction } from "./ChatbotReaction";

export const ChatbotListOfReactions = () => {
  
  const reactions = useSelector((state: RootState) => state.chatbot.reactions);

  return (
    <div>
      {Object.entries(reactions).map(
        ([reactionName, answer]) => <ChatbotReaction key={reactionName} reactionName={reactionName} answer={answer} />
      )}
    </div>
  );
}