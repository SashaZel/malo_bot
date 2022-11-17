import React from "react";

export const LeftColumn = (props: React.PropsWithChildren) => {
  return (
    <div className="fixed w-3/12 h-full -translate-y-10 border-r-2 border-neutral-200 dark:border-neutral-700">
      <div className="border-b-2 mt-4 ml-4 2xl:ml-12 border-neutral-200 dark:border-neutral-700">
        <span>lucil_bot</span>
      </div>
      <div className="h-5/6 2xl:ml-12 flex flex-col justify-between">
        {props.children}
        <div className="border-t-2 border-neutral-200 dark:border-neutral-700">
          <p className="font-semibold mt-4 text-neutral-500 dark:text-neutral-400">
            2022
          </p>

          <a
            href="mailto:lll555@yandex.ru"
            target="blank"
            className=" block mt-1 hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            Alexander Zelenkov
          </a>
          <a
            href="https://github.com/SashaZel/vite-react-redux-test"
            target="blank"
            className="block mt-1 hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            GitHub
          </a>
          <a
            href="https://t.me/sasha_zelenkov"
            target="blank"
            className="block mt-1 hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            Telegram
          </a>
          <a
            href="https://www.zelenkov.space/"
            target="blank"
            className="block mt-1 hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            www.zelenkov.space
          </a>
        </div>
      </div>
    </div>
  );
};
