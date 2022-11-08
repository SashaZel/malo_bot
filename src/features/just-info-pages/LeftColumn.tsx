import React from "react";

export const LeftColumn = (props: React.PropsWithChildren) => {
  return (
    <div
      className="fixed w-3/12 h-full border-r-2"
    >
      <div className="m-4 2xl:ml-12">
      <h2 className="m-1 lg:m-2 text-xl font-semibold border-b-2">
        Telegram chats
      </h2>
      <p className="mx-2">
        Choose chat, browse querries and answers. Write a messages by the hand.
      </p>
      <p className="mx-2">User have to interact with chatbot first.</p>
      <p className="mx-2">All messages saved automaticly.</p>
      {props.children}
      <div className="col-span-2">
        <div>
          2022
          <a
            href="https://www.zelenkov.space/"
            target="blank"
            className="inline-block ml-2"
          >
            Alexander Zelenkov
          </a>
          <a
            href="https://github.com/SashaZel/vite-react-redux-test"
            target="blank"
            className="font-semibold inline-block ml-2"
          >
            GitHub
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};
