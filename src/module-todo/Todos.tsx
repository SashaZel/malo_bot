import React from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { ITodo, todosReducer } from "../reducers/todo";
import { RootState } from "../store";
import { Todo } from "./Todo";

export const Todos = () => {

  const [nameForm, setNameForm] = React.useState('');
  const [descriptionForm, setDescriptionForm] = React.useState('');

  const todosList = useSelector((state: RootState) => state.todos.todoList);
  const dispatch = useDispatch();

  const handleTodoSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    // console.log(e.target);
    const actionTodo: ITodo = {
      todoId: nanoid(),
      todoName: e.target[0].value,
      todoDescription: e.target[1].value,
      done: false,
    };

    dispatch(todosReducer.actions.addTodo(actionTodo));

    setNameForm('');
    setDescriptionForm('');
  };

  //console.log(todosList);

  return (
    <div>
      <h4>--- Todo list ---</h4>
      <div>
        {todosList.map((todo: ITodo) => {
            console.log('add Todo!')
          return <Todo key={todo.todoId} todo={todo} />;
        })}
      </div>
      <form onSubmit={(e) => handleTodoSubmit(e)}>
        <label>
          Todo name
          <input type="text" value={nameForm} onChange={(e: React.BaseSyntheticEvent) => setNameForm(e.target.value)} />
        </label>
        <label>
          Todo description
          <input type="text" value={descriptionForm} onChange={(e: React.BaseSyntheticEvent) => setDescriptionForm(e.target.value)}/>
        </label>
        <input type="submit" value="Add Todo" />
      </form>
    </div>
  );
};
