export interface ParserFunctions<T> {
  /**
   * Guard function to ensure the unitText is parsable.  Should be called before calling parse(string).
   */
  canParse: (unitText: string | undefined) => boolean;

  /**
   * Parse text into an unit.  Guard method canParse(string) should be called before calling this function, otherwise an error could be thrown.
   */
  parse: (unitText: string | undefined) => T;
}