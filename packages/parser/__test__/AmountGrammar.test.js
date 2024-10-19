import { CharStreams, CommonTokenStream } from "antlr4";
import AmountLexer from "../AmountLexer";
import AmountParser from "../AmountParser";
import Trees from "./Trees";

function parseTree(input) {
  const charStream = CharStreams.fromString(input);
  const lexer = new AmountLexer(charStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new AmountParser(tokens);
  const parserRuleContext = parser.amount();
  return Trees.toStringTree(parserRuleContext, parser.ruleNames, parser);
}

test("alternate amount", () => {
  expect(parseTree("3/4 cup sections or 1 medium"))
    .toEqual("(amount (measurement (quantity 3/4) (unit cup sections)) or (measurement (quantity 1) (unit medium)))");
});

test("dash in unit", () => {
  expect(parseTree("1 of 12-inch"))
    .toEqual("(amount (measurement (quantity 1) (unit of 12-inch)))");
});

test("decimal quantity with no leading zero", () => {
  expect(parseTree(".5 cup"))
    .toEqual("(amount (measurement (quantity .5) (unit cup)))");
});

test("decimal quantity", () => {
  expect(parseTree("1.5 cups"))
    .toEqual("(amount (measurement (quantity 1.5) (unit cups)))");
});

test("integer quantity", () => {
  expect(parseTree("1 cup"))
    .toEqual("(amount (measurement (quantity 1) (unit cup)))");
});

test("fraction quantity", () => {
  expect(parseTree("1/2 cup"))
    .toEqual("(amount (measurement (quantity 1/2) (unit cup)))");
});

test("multi-word unit", () => {
  expect(parseTree("1 cup cooked"))
    .toEqual("(amount (measurement (quantity 1) (unit cup cooked)))");
});

test("no unit", () => {
  expect(parseTree("1"))
    .toEqual("(amount (measurement (quantity 1)))");
});

test("whole number and fraction quantity", () => {
  expect(parseTree("1 1/2 cups"))
    .toEqual("(amount (measurement (quantity 1 1/2) (unit cups)))");
});