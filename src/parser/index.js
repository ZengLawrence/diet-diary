import antlr4 from 'antlr4';
import FoodDescriptionLexer from '../../gen-src/parser/FoodDescriptionLexer';
import FoodDescriptionParser from '../../gen-src/parser/FoodDescriptionParser';
import FoodDescriptionListener from '../../gen-src/parser/FoodDescriptionListener';
import _ from 'lodash';

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

  exitNumber(ctx) {
    _.set(this.content, "measurement.number", ctx.getChild(0).getText());
  }

  exitUnit(ctx) {
    _.set(this.content, "measurement.unit", ctx.getChild(0).getText());
  }

  getContent() {
    return this.content;
  }
}

export function parseFoodDescription(input) {
  const chars = new antlr4.InputStream(input);
  const lexer = new FoodDescriptionLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new FoodDescriptionParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.foodDescription();
  const decomposer = new FoodDescriptionDecomposer(input);
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(decomposer, tree);

  return decomposer.getContent();
}
