import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { counterReducer } from '../reducers/counter';
import { RootState } from '../store';

interface IProps {
    awesomeStatement: string
}

export const ModuleOne: React.FunctionComponent<IProps> = (props) =>  {
    const x = 4;
    const myCount = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div>
          <h2>Hi, I am module One. And this is {props.awesomeStatement} and x is equals {x} and redux state {myCount}</h2>
          <button onClick={() => dispatch(counterReducer.actions.increment())}>
            Increment redux counter
          </button>
          <button onClick={() => dispatch(counterReducer.actions.decrement())}>
            Decrement redux counter
          </button>
          <button onClick={() => dispatch(counterReducer.actions.reset())}>
            RESET
          </button>
          <button onClick={() => dispatch(counterReducer.actions.incrementBy(5))}>
            Plus 5
          </button>
        </div>)
}