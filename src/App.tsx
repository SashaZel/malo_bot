import React from "react";
import { ModuleOne } from "./module-one/ModuleOne";
import { Todos } from "./module-todo/Todos";

function App(): React.ReactElement {
  const awesomeStatement = "This is awsome!";

  return (
    <div className="font-sans container mx-auto px-4 md:grid md:grid-cols-2 md:gap-4">
        <ModuleOne awesomeStatement={awesomeStatement} />
        <Todos />
    </div>
  );
}

export default App;
