import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../__testsUtils__/test-utils";
import { ChatbotReaction } from "../features/chatbot/ChatbotReaction";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (input: "routs.work.addKeywords" | "routs.work.save") => {
      const translation = {
        "routs.work.addKeywords": "Add keywords",
        "routs.work.save": "Save Changes",
      };
      return translation[input];
    },
  }),
}));

jest.mock("../api/IDB_API", () => ({
  saveThunkChatbotToIDB: () => null,
}));

test("@ChatbotReaction render answer and keywords", async () => {
  renderWithProviders(<ChatbotReaction reactionName="Greeting" answer="Hello, dear friend!" />);

  expect(screen.getByText(/Greeting/)).toBeInTheDocument();
  expect(screen.getAllByText(/Hello/)).toHaveLength(2);
  expect(screen.getByText(/hello/)).toBeInTheDocument();
  expect(screen.getByText(/hi/)).toBeInTheDocument();
  expect(screen.getByText(/привет!/)).toBeInTheDocument();
  expect(screen.getByText(/Hello, dear friend!/)).toBeInTheDocument();
});

// Jest and RTS doesn't handle React synthetic events properly!
// Nothing founded even on StackOverflow.
// no e.target[0].value !!!
// Just clicks... useless stuff...

test("@ChatbotReaction remove keyword", async () => {
  const user = userEvent.setup();
  renderWithProviders(<ChatbotReaction reactionName="Greeting" answer="Hello, dear friend!" />);
  const keywordCardWithNameHi = screen.getByRole("button", {
    name: "keyword: hi",
  });

  expect(keywordCardWithNameHi).toBeInTheDocument();
  await user.click(keywordCardWithNameHi);
  expect(keywordCardWithNameHi).not.toBeInTheDocument();
});
