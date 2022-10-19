import React from "react";
import { Panel } from "../common/Panel";
import { ChatbotPanel } from "../features/chatbot/ChatbotPanel";
import { Counter } from "../features/counter/Counter";
import { IDB } from "../features/idb/IDB";
import { TelegramPanel } from "../features/telegram-api/TelegramPanel";
import { TodoPanel } from "../features/todo/TodoPanel";

function App(): React.ReactElement {
  const awesomeStatement = "This is awsome!";

  return (
    <div className="font-sans container mx-auto px-4 md:grid md:grid-cols-2 md:gap-4">
      <Panel>
        <Counter awesomeStatement={awesomeStatement} />
      </Panel>
      <Panel>
        <IDB />
      </Panel>
      <Panel>
        <TelegramPanel />
      </Panel>
      <Panel>
        <ChatbotPanel />
      </Panel>
      <Panel>
        <TodoPanel />
      </Panel>
    </div>
  );
}

export default App;
