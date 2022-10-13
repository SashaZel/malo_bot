import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { TodoMemo } from "./Todo";
import { ITodo } from "./todoSlice";

export const TodoListPanel = () => {

    //console.log('@ TodoListPanel');
    const todosList = useSelector((state: RootState) => state.todos.todoList);

    return (
        <div>
        {todosList.map((todo: ITodo) => {
          //console.log("add Todo!");
          return <TodoMemo key={todo.todoId} todo={todo} />;
        })}
      </div>
    );
}