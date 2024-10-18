import { CharStreams, CommonTokenStream } from "antlr4";
import FoodDescriptionLexer from "../generated/parser/FoodDescriptionLexer";
import FoodDescriptionParser from "../generated/parser/FoodDescriptionParser";
import Trees from "./Trees";

describe("Food description grammar", () => {

  test("Full description", () => {
    const input = "broccoli 1 cup";
    const charStream = CharStreams.fromString(input);
    const lexer = new FoodDescriptionLexer(charStream);
    const tokens = new CommonTokenStream(lexer);
    const parser = new FoodDescriptionParser(tokens);
    const parserRuleContext = parser.foodDescription();
    const lispTree = Trees.toStringTree(parserRuleContext, parser.ruleNames, parser);
    expect(lispTree).toBe("(foodDescription (foodName broccoli) (measurement (quantity 1) (unit cup)))");
  });
})