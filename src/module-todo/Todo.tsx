import React from "react";
import { ITodo } from "../reducers/todo";

export const Todo: React.FunctionComponent<{todo: ITodo}> = ({todo}) => {
    //console.log('Todo props', props);

    return (
        <div>
            <div>
                Todo name: {todo.todoName}
            </div>
            <div>
                Todo Description: {todo.todoDescription}
            </div>
        </div>
    );
}