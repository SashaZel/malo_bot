import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITodo {
    todoId: string;
    todoName: string;
    todoDescription: string;
    done: boolean;
}

interface ITodoList {
    todoList: Array<ITodo>
}

export const todosReducer = createSlice({
    name: 'todos',
    initialState: {
        todoList: []
    } as ITodoList,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>): void => {
            state.todoList.push(action.payload)
        }
    }
});