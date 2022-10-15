import React from "react";
import { useDispatch } from "react-redux";
import { IAccount, telegramReducer } from "./telegramSlice";

export const LogInForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    console.log("@login 0 _ ", e.target[0].value);
    //TODO: Add check of input data
    const newAccountData: IAccount = {
      bot_name: e.target[0].value,
      bot_token: e.target[1].value,
      update_id: 0,
    };
    dispatch(telegramReducer.actions.setAccountData(newAccountData));
  };

  return (
    <div>
      <form onSubmit={(e: React.SyntheticEvent) => handleLogin(e)}>
        <label>
          <p>Bot name:</p>
          <input />
        </label>
        <label>
          <p>Token:</p>
          <input />
        </label>
        <input type="submit" value="Log In" className="my-button" />
      </form>
    </div>
  );
};
