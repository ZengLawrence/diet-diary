import antlr4 from 'antlr4';
import Fraction from 'fraction.js';
import _ from 'lodash';
import AmountLexer from '../../../generated/parser/AmountLexer';
import AmountListener from '../../../generated/parser/AmountListener';
import AmountParser from '../../../generated/parser/AmountParser';
import { CaseChangingStream } from './CaseChangingStream';

function toNumber(str) {
  return str.includes('/') ? new Fraction(str).valueOf() : _.toNumber(str);
}

function getCurrentMeasurement(content) {
  if (_.get(content, "alternateMeasurement")) {
    return _.get(content, "alternateMeasurement");
  } else {
    return _.get(content, "measurement");
  }
}
class AmountDecomposer extends AmountListener {

  constructor(input) {
    super();
    this.input = input;
    this.content = {};
    this.amountStart = 0;
  }

  exitQuantity(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    const measurement = getCurrentMeasurement(this.content);
    _.set(measurement, "quantityText", val);
    _.set(measurement, "quantity", toNumber(val));
  }

  exitUnit(ctx) {
    const val = this.input.substring(ctx.start.column, ctx.stop.stop + 1);
    const measurement = getCurrentMeasurement(this.content);
    _.set(measurement, "unitText", val);
  }

  enterMeasurement(ctx) {
    if (this.amountStart === 0) {
      this.amountStart = ctx.start.column;
    }
    if (_.isUndefined(_.get(this.content, "measurement"))) {
      _.set(this.content, "measurement", {});
    } else {
      _.set(this.content, "alternateMeasurement", {});
    }
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

  const chars = new antlr4.InputStream(input);
  const lowerCaseChars = new CaseChangingStream(chars, false);
  const lexer = new AmountLexer(lowerCaseChars);
  const errorListener = new SyntaxErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new AmountParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.amount();
  const decomposer = new AmountDecomposer(input);
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(decomposer, tree);

  const parsed = decomposer.getContent();
  if (errorListener.hasError) {
    _.set(parsed, "hasError", true);
  }
  return parsed;
}
