import React from "react";

export const About = () => {
  return <div>
    <p className="font-semibold text-sm mt-4 text-neutral-500 dark:text-neutral-400">
            2022
          </p>

          <a
            href="mailto:lll555@yandex.ru"
            target="blank"
            className="text-sm block mt-1 hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            Alexander Zelenkov
          </a>
          <a
            href="https://github.com/SashaZel/vite-react-redux-test"
            target="blank"
            className="text-sm block mt-1 hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
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
}