import React from "react";
import { useDispatch } from "react-redux";
import { ITodo, todosReducer } from "./todoSlice";
import "./Todo.css?inline";

const Todo: React.FC<{ todo: ITodo }> = ({ todo }) => {

  //console.log('Render Todo Element');
  //console.log('Todo props', props);
  const dispatch = useDispatch();

  const handleDelete = () => {
    //console.log('fire handleDelete');
    dispatch(todosReducer.actions.delTodo(todo));
  };

  const handleDone = () => {
    dispatch(todosReducer.actions.doneTodo(todo));
  };

  const doneTodoColor = todo.done
    ? "bg-lime-300 border-green-500"
    : "bg-red-300 border-red-500";

  return (
    <div className="border-2 border-stone-300 m-1 p-1 bg-slate-100">
      <h3 className="m-1 text-left">Todo name: {todo.todoName}</h3>
      <div className="m-1 text-left">
        Todo Description: {todo.todoDescription}
      </div>
      <div className="text-left">
        <button
          className="border-2 border-slate-400 bg-slate-300 p-3"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <span className={`${doneTodoColor} border-2 p-3 ml-3`}>Done</span>
        <button
          className="border-2 border-slate-400 bg-slate-300 p-3 ml-3"
          onClick={() => handleDone()}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export const TodoMemo = React.memo(Todo);
