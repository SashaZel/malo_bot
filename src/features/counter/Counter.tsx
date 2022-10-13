import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterReducer } from "./counterSlice";
import { RootState } from "../../app/store";

interface IProps {
  awesomeStatement: string;
}

export const Counter: React.FunctionComponent<IProps> = (props) => {
  const x = 4;
  const myCount = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h2>
        Hi, I am module One. And this is {props.awesomeStatement} and x is
        equals {x} and redux state {myCount}
      </h2>
      <button
        onClick={() => dispatch(counterReducer.actions.increment())}
        className="my-button"
      >
        Increment redux counter
      </button>
      <button
        onClick={() => dispatch(counterReducer.actions.decrement())}
        className="my-button"
      >
        Decrement redux counter
      </button>
      <button
        onClick={() => dispatch(counterReducer.actions.reset())}
        className="my-button"
      >
        RESET
      </button>
      <button
        onClick={() => dispatch(counterReducer.actions.incrementBy(5))}
        className="my-button"
      >
        Plus 5
      </button>
    </>
  );
};
