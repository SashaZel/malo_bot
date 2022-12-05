import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../__testsUtils__/test-utils";
import { Message } from "../features/telegram/Message";

test("render simple Message", async () => {
  renderWithProviders(<Message message_id={1276} />);

  expect(screen.getByText(/hi/i)).toBeInTheDocument();
});

test("render Message with buttons", async () => {
  renderWithProviders(<Message message_id={1273} />);

  expect(screen.getByText(/A: cube/)).toBeInTheDocument();
});
