import { nanoid } from "nanoid";
import React from "react";
import { useDispatch } from "react-redux";
import { ITodo, todosReducer } from "./todoSlice";

export const TodoForm = () => {

  //console.log('@ TodoForm');

  const [nameForm, setNameForm] = React.useState("");
  const [descriptionForm, setDescriptionForm] = React.useState("");

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

    setNameForm("");
    setDescriptionForm("");
  };

  return (
    <>
      <form onSubmit={(e) => handleTodoSubmit(e)}>
        <label className="flex my-1">
          <div className="w-1/3">Todo name</div>
          <input
            type="text"
            value={nameForm}
            onChange={(e: React.BaseSyntheticEvent) =>
              setNameForm(e.target.value)
            }
            className="border-2 w-2/3 my-1"
          />
        </label>
        <label className="flex">
          <div className="w-1/3">Todo description</div>
          <input
            type="text"
            value={descriptionForm}
            onChange={(e: React.BaseSyntheticEvent) =>
              setDescriptionForm(e.target.value)
            }
            className="border-2 w-2/3"
          />
        </label>
        <input
          type="submit"
          value="Add Todo"
          className="my-button"
        />
      </form>
    </>
  );
};
