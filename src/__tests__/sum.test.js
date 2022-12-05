import { sum } from "../features/chatbot/inputListener";
import { expect, test } from "@jest/globals";

test("1+2 is equals 3", () => {
  expect(sum(1, 2)).toBe(3);
});