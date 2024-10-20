import static org.junit.jupiter.api.Assertions.assertEquals;

import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.Trees;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

public class AmountIT {

  @ParameterizedTest
  @CsvFileSource(resources = "/amount-data.csv", useHeadersInDisplayName = true, delimiter = '|')
  public void testGrammar(final String input, final String expected) {
    final var charStream = CharStreams.fromString(input);
    final var lexer = new AmountLexer(charStream);
    final var tokens = new CommonTokenStream(lexer);
    final var parser = new AmountParser(tokens);
    final var parserRuleContext = parser.amount();
    final var lispTree = Trees.toStringTree(parserRuleContext, parser);
    assertEquals(expected, lispTree);
  }
}
