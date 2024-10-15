package grammar;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.Trees;
import org.junit.jupiter.api.Test;

public class FoodDescriptionIT {

  @Test
  public void test() {
    final var input = "broccoli 1 cup";
    final var charStream = CharStreams.fromString(input);
    final var lexer = new FoodDescriptionLexer(charStream);
    final var tokens = new CommonTokenStream(lexer);
    final var parser = new FoodDescriptionParser(tokens);
    final var parserRuleContext = parser.foodDescription();
    final String lispTree = Trees.toStringTree(parserRuleContext, parser);
    assertEquals("(foodDescription (foodName broccoli) (measurement (quantity 1) (unit cup)))", lispTree);
  }
}
