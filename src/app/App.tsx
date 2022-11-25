import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "../routs/Root";
import { Docs } from "../routs/Docs";
import { Settings } from "../routs/Settings";
import { Work } from "../routs/Work";
import { Index } from "../routs";
import { About } from "../routs/About";

export function App(): React.ReactElement {
  const router = createBrowserRouter([
    {
      path: "/malo_bot/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Index />
        },
        {
          path: "docs",
          element: <Docs />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "work",
          element: <Work />
        },
        {
          path: "about",
          element: <About />
        }
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
