import React from "react";
import { Panel } from "../common/Panel";
import { ChatbotPanel } from "../features/chatbot/ChatbotPanel";
import { TelegramPanel } from "../features/telegram-api/TelegramPanel";

function App(): React.ReactElement {
  return (
    <div className="bg-gradient-to-r from-lime-100 via-amber-100 to-lime-200 pt-2 pb-6">
      <div className="font-sans container mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-y-2 lg:gap-x-4 xl:gap-x-6 ">
        <Panel>
          <ChatbotPanel />
        </Panel>
        <Panel>
          <TelegramPanel />
        </Panel>
        <div className="col-span-2">
          <Panel>
            <div>
              2022
              <a href="https://www.zelenkov.space/" target="blank" className="inline-block ml-2">
                Alexander Zelenkov
              </a> 
              <a
                href="https://github.com/SashaZel/vite-react-redux-test"
                target="blank"
                className="font-semibold inline-block ml-2"
              >
                GitHub
              </a>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default App;
