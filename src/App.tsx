import React from "react";
import "./App.css";
import { ModuleOne } from "./module-one/ModuleOne";
import { Todos } from "./module-todo/Todos";

function App(): React.ReactElement {
  const [count, setCount] = React.useState(0);
  const awesomeStatement = "This is awsome!";

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <h1>Count is {count}</h1>
        <button onClick={() => setCount((count) => count + 1)}>Count +</button>
        <button onClick={() => setCount((count) => count - 1)}>Count -</button>
        <ModuleOne awesomeStatement={awesomeStatement} />
        <Todos />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
