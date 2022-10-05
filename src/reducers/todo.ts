import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITodo {
    todoId: number;
    todoName: string;
    todoDescription: string;
    done: boolean;
}

interface ITodos {
    todos: Array<ITodo>
}

export const todosReducer = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    } as ITodos,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>): void => {
            state.todos.push(action.payload)
        }
    }
});