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
            state.todoList.push(action.payload);
        },
        delTodo: (state, action: PayloadAction<ITodo>): void => {
            state.todoList = state.todoList.filter(todo => todo.todoId !== action.payload.todoId);
        },
        doneTodo: (state, action: PayloadAction<ITodo>): void => {
            state.todoList = state.todoList.map((todo) => {
                if (todo.todoId === action.payload.todoId) {
                    return todo = {...todo, done: true};
                }
                return todo;
            });
        },
        setTodoFromIDB: (state, action): void => {
            state.todoList = action.payload;
        }
    }
});