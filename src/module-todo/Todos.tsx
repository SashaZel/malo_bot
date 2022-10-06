import React from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { ITodo, todosReducer } from "../reducers/todo";
import { RootState } from "../store";
import { Todo } from "./Todo";

export const Todos = () => {
  const todosList = useSelector((state: RootState) => state.todos.todoList);
  const dispatch = useDispatch();

  const handleTodoSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    console.log(e.target);
    const actionTodo: ITodo = {
      todoId: nanoid(),
      todoName: e.target[0].value,
      todoDescription: e.target[1].value,
      done: false,
    };

    dispatch(todosReducer.actions.addTodo(actionTodo));
  };

  console.log(todosList);

  return (
    <div>
      <div>
        This is {todosList[0]?.todoId ?? "none-0"}{" "}
        {todosList[1]?.todoId ?? "none-1"}
      </div>
      <div>
        {todosList.map((todo: ITodo) => {
            console.log('add Todo!')
          return <Todo key={todo.todoId} todo={todo} />;
        })}
      </div>
      <form onSubmit={(e) => handleTodoSubmit(e)}>
        <label>
          Todo name
          <input type="text" />
        </label>
        <label>
          Todo description
          <input type="text" />
        </label>
        <input type="submit" value="Add Todo" />
      </form>
    </div>
  );
};
