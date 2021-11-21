import antlr4 from 'antlr4';
import Fraction from 'fraction.js';
import _ from 'lodash';
import FoodDescriptionLexer from '../../../generated/parser/FoodDescriptionLexer';
import FoodDescriptionListener from '../../../generated/parser/FoodDescriptionListener';
import FoodDescriptionParser from '../../../generated/parser/FoodDescriptionParser';
import { CaseChangingStream } from './CaseChangingStream';

function toNumber(str) {
  return str.includes('/') ? new Fraction(str).valueOf() : _.toNumber(str);
}
class FoodDescriptionDecomposer extends FoodDescriptionListener {

  constructor(input) {
    super();
    this.input = input;
    this.content = {
      foodName: "",
    };
    this.amountStart = 0;
  }

  exitFoodName(ctx) {
    const stop = _.get(ctx, "stop.stop", ctx.start.column);
    const val = this.input.substring(ctx.start.column, stop + 1);
    _.set(this.content, "foodName", val);  
  }

  exitQuantity(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    const measurement = _.get(this.content, "measurement");
    _.set(measurement, "quantityText", val);
    _.set(measurement, "quantity", toNumber(val));
  }

  exitUnit(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    const measurement = _.get(this.content, "measurement");
    _.set(measurement, "unitText", val);
  }

  enterMeasurement(ctx) {
    _.set(this.content, "measurement", {});
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

export default function parse(input) {

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
  try {
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(decomposer, tree);
  } catch (err) {
    console.error(err);
  }

  const parsed = decomposer.getContent();
  if (errorListener.hasError) {
    _.set(parsed, "hasError", true);
  }
  return parsed;
}
