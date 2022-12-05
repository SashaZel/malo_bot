import { splitTextAndMarkup } from "../utils/splitTextAndMarkup";
import { expect, test } from "@jest/globals";

test("split with no buttons", () => {
  expect(splitTextAndMarkup("You are right! Smart one!")).toStrictEqual({ text: "You are right! Smart one!", markup: "" });
});

test("split with buttons", () => {
  const input = 'What is the shape of the Earth???reply_markup={"keyboard":[["A: cube"],["B: sphere"],["C: irregularly shaped ellipsoid"],["D: flat"]],"resize_keyboard":true,"one_time_keyboard":true}'
  expect(splitTextAndMarkup(input)).toStrictEqual({ 
    text: "What is the shape of the Earth?", 
    markup: '{"keyboard":[["A: cube"],["B: sphere"],["C: irregularly shaped ellipsoid"],["D: flat"]],"resize_keyboard":true,"one_time_keyboard":true}' 
  });
});