import React from "react";
import { useDispatch } from "react-redux";
import { ITodo, todosReducer } from "../reducers/todo";
import "./Todo.css?inline";

export const Todo: React.FC<{ todo: ITodo }> = ({ todo }) => {
  //console.log('Todo props', props);
  const dispatch = useDispatch();

  const handleDelete = () => {
    //console.log('fire handleDelete');
    dispatch(todosReducer.actions.delTodo(todo));
  };

  const handleDone = () => {
    dispatch(todosReducer.actions.doneTodo(todo));
  };

  const doneTodoColor = todo.done ? "bg-lime-300" : "bg-red-300";

  return (
    <div className="border-2 border-stone-300 m-1 p-1 bg-amber-50">
      <h3 className="m-1 text-left">Todo name: {todo.todoName}</h3>
      <div className="m-1 text-left">Todo Description: {todo.todoDescription}</div>
      <div className="text-left">
        <button
          className="border-2 bg-amber-100"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <span className={`todo-done ${doneTodoColor}`}>Done</span>
        <button className="todo-card__del-button" onClick={() => handleDone()}>
          Done
        </button>
      </div>
    </div>
  );
};
