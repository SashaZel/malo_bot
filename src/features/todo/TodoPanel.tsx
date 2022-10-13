import React from "react";
import { TodoListPanel } from "./TodoListPanel";
import { TodoForm } from "./TodoForm";

export const TodoPanel = () => {

  //console.log("Render TodoPanel");

  return (
    <>
      <h4>--- Todo list ---</h4>
      <TodoListPanel />
      <TodoForm />
    </>
  );
};
