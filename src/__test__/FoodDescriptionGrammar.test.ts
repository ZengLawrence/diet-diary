import { CharStreams, CommonTokenStream } from "antlr4";
import FoodDescriptionLexer from "../generated/parser/FoodDescriptionLexer";
import FoodDescriptionParser from "../generated/parser/FoodDescriptionParser";
import Trees from "./Trees";

function testGrammar(input: string, expectedParsedTree: string) {
  const charStream = CharStreams.fromString(input);
  const lexer = new FoodDescriptionLexer(charStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new FoodDescriptionParser(tokens);
  const parserRuleContext = parser.foodDescription();
  const lispTree = Trees.toStringTree(parserRuleContext, parser.ruleNames, parser);
  expect(lispTree).toBe(expectedParsedTree);
}

describe("Food description grammar", () => {

  test("Full description", () => {
    testGrammar("broccoli 1 cup", "(foodDescription (foodName broccoli) (measurement (quantity 1) (unit cup)))");
  });
})