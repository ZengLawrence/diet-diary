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
    this.content = {};
    this.amountStart = 0;
  }

  exitFoodName(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    _.set(this.content, "foodName", val);
  }

  exitQuantity(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    if (_.has(this.content, "quantityText")) {
      _.set(this.content, "alternateQuantityText", val);
      _.set(this.content, "alternateQuantity", toNumber(val));
    } else {
      _.set(this.content, "quantityText", val);
      _.set(this.content, "quantity", toNumber(val));
    }
  }

  exitUnit(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    if (_.has(this.content, "unitText")) {
      _.set(this.content, "alternateUnitText", val);
    } else {
      _.set(this.content, "unitText", val);
    }
  }

  enterMeasurement(ctx) {
    if (this.amountStart === 0) {
      this.amountStart = ctx.start.column;
    }
  }

  exitMeasurement(ctx) {
    const val = this.input.substring(this.amountStart, ctx.stop.stop + 1);
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
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(decomposer, tree);

  const parsed = decomposer.getContent();
  if (errorListener.hasError) {
    _.set(parsed, "hasError", true);
  }
  return parsed;
}
