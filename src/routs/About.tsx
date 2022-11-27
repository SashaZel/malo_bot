import React from "react";

export const About = () => {
  
  return <div className="w-5/6 2xl:w-2/3 mx-8 mt-72 font-semibold text-lg text-neutral-500 dark:text-neutral-400">
    <p className="text-4xl text-right">Hi, I&apos;m Alexander Zelenkov.</p>
    <p className="mt-12">I created this app for fun and hope you&apos;ll enjoy it.</p>
    <p>Feel free to contact me via <a
            href="mailto:lll555@yandex.ru"
            target="blank"
            className=" hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            lll555@yandex.ru
          </a> or <a
            href="https://t.me/sasha_zelenkov"
            target="blank"
            className=" hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            Telegram
          </a></p>
    <p>
      Check the source code at <a
            href="https://github.com/SashaZel/malo_bot"
            target="blank"
            className=" hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            GitHub
          </a></p> 
    <p>
      and visit my personal page <a
            href="https://www.zelenkov.space/"
            target="blank"
            className=" hover:text-black font-semibold text-neutral-500 dark:hover:text-neutral-100 dark:text-neutral-400"
          >
            www.zelenkov.space
          </a>
    </p>
          
  </div>
}