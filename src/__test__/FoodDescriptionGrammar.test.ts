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

  test("food name + measurement", () => {
    expect(parseTree("broccoli 1 cup"))
      .toEqual("(foodDescription (foodName broccoli) (measurement (quantity 1) (unit cup)))");
  });
})