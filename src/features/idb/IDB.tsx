import React from "react";
import { get, set } from "idb-keyval";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { counterReducer } from "../counter/counterSlice";
import { todosReducer } from "../todo/todoSlice";

export const IDB = () => {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const todosList = useSelector((state: RootState) => state.todos.todoList)
  const dispatch = useDispatch();

  const handleSetIDBcounter = () => {
    set("counter", counterValue)
      .then(() => console.log("I set my counter"))
      .catch((error) => console.error("IDB set failed", error));
  };

  const handleGetIDBcounter = () => {
    get("counter")
      .then((valueFromIDB) => {
        dispatch(counterReducer.actions.setValue(valueFromIDB));
      })
      .catch((error) => console.log("IDB get failed", error));
  };

  const handleSetIDBtodos = () => {
    set("todoList", todosList)
      .then(() => console.log("I set my todos"))
      .catch((error) => console.error("IDB set failed", error));
  };

  const handleGetIDBtodos = () => {
    get("todoList")
      .then((valueFromIDB) => {
        dispatch(todosReducer.actions.setTodoFromIDB(valueFromIDB));
      })
      .catch((error) => console.log("IDB get failed", error));
  };

  return (
    <>
      <h3>Hi IDB!</h3>
      <div>
        <p>The value is </p>
        <button
          onClick={() => handleSetIDBcounter()}
          className="my-button"
        >
          Set counter value to IDB
        </button>
        <button
          onClick={() => handleGetIDBcounter()}
          className="my-button"
        >
          Get counter value from IDB
        </button>
      </div>
      <div>
        <button
          onClick={() => handleSetIDBtodos()}
          className="my-button"
        >
          Set TODOs to IDB
        </button>
        <button
          onClick={() => handleGetIDBtodos()}
          className="my-button"
        >
          Get TODOs from IDB
        </button>
      </div>
    </>
  );
};
