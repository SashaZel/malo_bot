import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterReducer } from "../reducers/counter";
import { RootState } from "../store";

interface IProps {
  awesomeStatement: string;
}

export const ModuleOne: React.FunctionComponent<IProps> = (props) => {
  const x = 4;
  const myCount = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="my-3 pt-9 px-1 bg-slate-50 border-2 border-solid border-slate-400">
      <h2>
        Hi, I am module One. And this is {props.awesomeStatement} and x is
        equals {x} and redux state {myCount}
      </h2>
      <button
        onClick={() => dispatch(counterReducer.actions.increment())}
        className="p-2 m-1 bg-slate-300 border-2 border-slate-500"
      >
        Increment redux counter
      </button>
      <button
        onClick={() => dispatch(counterReducer.actions.decrement())}
        className="p-2 m-1 bg-slate-300 border-2 border-slate-500"
      >
        Decrement redux counter
      </button>
      <button
        onClick={() => dispatch(counterReducer.actions.reset())}
        className="p-2 m-1 bg-slate-300 border-2 border-slate-500"
      >
        RESET
      </button>
      <button
        onClick={() => dispatch(counterReducer.actions.incrementBy(5))}
        className="p-2 m-1 bg-slate-300 border-2 border-slate-500"
      >
        Plus 5
      </button>
    </div>
  );
};
