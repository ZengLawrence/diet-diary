import { CharStreams, CommonTokenStream } from "antlr4";
import FoodDescriptionLexer from "../generated/parser/FoodDescriptionLexer";
import FoodDescriptionParser from "../generated/parser/FoodDescriptionParser";
import Trees from "./Trees";

function parseTree(input: string) {
  const charStream = CharStreams.fromString(input);
  const lexer = new FoodDescriptionLexer(charStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new FoodDescriptionParser(tokens);
  const parserRuleContext = parser.foodDescription();
  return Trees.toStringTree(parserRuleContext, parser.ruleNames, parser);
}

describe("Full description", () => {

  test("% in food name", () => {
    expect(parseTree("2% milk 1 cup"))
      .toEqual("(foodDescription (foodName 2% milk) (measurement (quantity 1) (unit cup)))");
  });

  test("alternate amount", () => {
    expect(parseTree("Orange 3/4 cup sections or 1 medium"))
      .toEqual("(foodDescription (foodName Orange) (measurement (quantity 3/4) (unit cup sections or)))");
  });

  test("comma in food name", () => {
    expect(parseTree("Nuts, peanuts 8 wholes"))
      .toEqual("(foodDescription (foodName Nuts peanuts) (measurement (quantity 8) (unit wholes)))");
  });

  test("dash in unit", () => {
    expect(parseTree("pizza 1 of 12-inch"))
      .toEqual("(foodDescription (foodName pizza) (measurement (quantity 1) (unit of 12-inch)))");
  });

  test("decimal quantity with no leading zero", () => {
    expect(parseTree("brocoli .5 cup"))
      .toEqual("(foodDescription (foodName brocoli) (measurement (quantity .5) (unit cup)))");
  });

  test("decimal quantity", () => {
    expect(parseTree("brocoli 1.5 cups"))
      .toEqual("(foodDescription (foodName brocoli) (measurement (quantity 1.5) (unit cups)))");
  });

  test("fraction quantity", () => {
    expect(parseTree("brocoli 1/2 cup"))
      .toEqual("(foodDescription (foodName brocoli) (measurement (quantity 1/2) (unit cup)))");
  });

  test("whole number and fraction quantity", () => {
    expect(parseTree("brocoli 1 1/2 cups"))
      .toEqual("(foodDescription (foodName brocoli) (measurement (quantity 1 1/2) (unit cups)))");
  });

  test("food name + measurement", () => {
    expect(parseTree("broccoli 1 cup"))
      .toEqual("(foodDescription (foodName broccoli) (measurement (quantity 1) (unit cup)))");
  });

  test("multi-word food name", () => {
    expect(parseTree("broccoli creamed cooked 1 cup"))
      .toEqual("(foodDescription (foodName broccoli creamed cooked) (measurement (quantity 1) (unit cup)))");
  });

  test("multi-word unit", () => {
    expect(parseTree("broccoli 1 cup cooked"))
      .toEqual("(foodDescription (foodName broccoli) (measurement (quantity 1) (unit cup cooked)))");
  });

  test("unit name in food name", () => {
    expect(parseTree("cup noodle large 1 cup"))
      .toEqual("(foodDescription (foodName cup noodle large) (measurement (quantity 1) (unit cup)))");
  });

});

describe("Food name only", () => {

  test("dash in food name", () => {
    expect(parseTree("Canadian-style bacon"))
      .toEqual("(foodDescription (foodName Canadian-style bacon))");
  });

  test("food name only", () => {
    expect(parseTree("broccoli"))
      .toEqual("(foodDescription (foodName broccoli))");
  });

  test("no unit", () => {
    expect(parseTree("banana 1"))
      .toEqual("(foodDescription (foodName banana) (measurement (quantity 1)))");
  });

  test("number dash in food name", () => {
    expect(parseTree("pizza 12-inch pie"))
      .toEqual("(foodDescription (foodName pizza 12-inch pie))");
  });

});