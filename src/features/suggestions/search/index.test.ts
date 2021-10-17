import _ from "lodash";
import React from "react";
import { generateSuggestions, Suggestion } from ".";

class MockRefObject implements React.MutableRefObject<String> {
  current: String;
  constructor(val: string) {
    this.current = val;
  }
}

test("search for exact name e.g. 'Broccoli' should return at least 2 row and first row is 'broccoli' with lower case b and second row is serving suggestion", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(2);
    expect(suggestions[0]).toMatchObject({ "foodName": "broccoli" });
    expect(suggestions[1]).toMatchObject(
      {
        "foodName": "Broccoli",
        "amount": "1 cup florets",
        "bestChoice": true
      }
    );
  }
  generateSuggestions(new MockRefObject("Broccoli"), assert);
})

test("search with more than 5 words suggestions e.g. 'pea' should return at 5 rows with just 'foodName' key in objects, and one of them should be 'pea'", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toEqual(5);
    suggestions.forEach(suggestion => {
      expect(_.has(suggestion, "foodName")).toBeTruthy();
      expect(_.keys(suggestion).length).toEqual(1);
    }
    );
    expect(suggestions).toContainEqual<Suggestion>({ foodName: "pea" });
  }
  generateSuggestions(new MockRefObject("pea"), assert);
})
