import antlr4 from 'antlr4';
import FoodDescriptionLexer from '../../../generated/parser/FoodDescriptionLexer';
import FoodDescriptionParser from '../../../generated/parser/FoodDescriptionParser';
import FoodDescriptionListener from '../../../generated/parser/FoodDescriptionListener';
import _ from 'lodash';
import { CaseChangingStream } from './CaseChangingStream';
import Fraction from 'fraction.js';

function toNumber(str) {
  return str.includes('/') ? new Fraction(str).round(3).valueOf() : _.toNumber(str);
}
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
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
      _.set(this.content, "quantity", toNumber(val));
  }

  exitUnit(ctx) {
    _.set(this.content, "unit", _.lowerCase(ctx.getChild(0).getText()));
  }

  exitMeasurement(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    _.set(this.content, "amount", val);
  }

  getContent() {
    return this.content;
  }
}

class SyntaxErrorListener extends antlr4.error.ErrorListener {
  constructor() {
    super();
    this.hasError = false;
  }

  syntaxError(_recognizer, _offendingSymbol, _line, _column, _msg, _e) {
    this.hasError = true;
  }

}

export function parseFoodDescription(input) {

  if (_.isEmpty(input)) return { foodName: "" };

  const chars = new antlr4.InputStream(input);
  const lowerCaseChars = new CaseChangingStream(chars, false);
  const lexer = new FoodDescriptionLexer(lowerCaseChars);
  const errorListener = new SyntaxErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new FoodDescriptionParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.foodDescription();
  const decomposer = new FoodDescriptionDecomposer(input);
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(decomposer, tree);

  const parsed = decomposer.getContent();
  if (errorListener.hasError) {
    _.set(parsed, "hasError", true);
  }
  return parsed;
}
