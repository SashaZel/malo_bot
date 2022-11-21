import React from "react";
import { Link } from "react-router-dom";
import mainLogo from '../../assets/logos/logo_main.svg'

export const LeftColumn = (props: React.PropsWithChildren) => {
  return (
    <div className="fixed h-full w-3/12 -translate-y-12 border-r-2 border-neutral-200 dark:border-neutral-700">
      <div className="pb-2 mr-2 ml-4 2xl:ml-12">
        <Link to={'/'}><img src={mainLogo} alt="malo_bot logo" /></Link>
      </div>
      <div className="h-[75%] 2xl:ml-12 flex flex-col justify-between">
        <div>
          {props.children}
          <nav>
            <ul>
              <li>
                <Link
                  to={'settings'}
                  className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to={'about'}
                  className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                >
                  About this app
                </Link>
              </li>
              <li>
                <Link
                  to={'docs'}
                  className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  to={'work'}
                  className="block my-1 p-2 w-full text-lg hover:bg-neutral-100 text-left font-semibold text-neutral-500 dark:hover:bg-neutral-800 dark:text-neutral-400"
                >
                  Working Area
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t-2 border-neutral-200 dark:border-neutral-700">
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
        </div>
      </div>
    </div>
  );
};
