import antlr4 from 'antlr4';
import FoodDescriptionLexer from '../../../../gen-src/parser/FoodDescriptionLexer';
import FoodDescriptionParser from '../../../../gen-src/parser/FoodDescriptionParser';
import FoodDescriptionListener from '../../../../gen-src/parser/FoodDescriptionListener';
import _ from 'lodash';
import { CaseChangingStream } from './CaseChangingStream';

class FoodDescriptionDecomposer extends FoodDescriptionListener {

  constructor(input) {
    super();
    this.input = input;
    this.content = {};
  }

  exitFoodName(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    _.set(this.content, "foodName", val);
  }

  exitQuantity(ctx) {
    _.set(this.content, "measurement.quantity", ctx.getChild(0).getText());
  }

  exitUnit(ctx) {
    _.set(this.content, "measurement.unit", _.lowerCase(ctx.getChild(0).getText()));
  }

  getContent() {
    return this.content;
  }
}

export function parseFoodDescription(input) {
  const chars = new antlr4.InputStream(input);
  const lowerCaseChars = new CaseChangingStream(chars, false);
  const lexer = new FoodDescriptionLexer(lowerCaseChars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new FoodDescriptionParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.foodDescription();
  const decomposer = new FoodDescriptionDecomposer(input);
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(decomposer, tree);

  return decomposer.getContent();
}
