import _ from "lodash";
import React from "react";
import { generateSuggestions, Suggestion } from ".";

class MockRefObject implements React.MutableRefObject<String> {
  current: String;
  constructor(val: string) {
    this.current = val;
  }
}

test("search for exact name e.g. 'broccoli' should return at least 3 rows.  First 3 rows: 1) 'broccoli' word suggestion, 2) 'broccoli' word suggestion with serving, 3) serving suggestion", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(3);
    expect(suggestions[0]).toMatchObject({ "foodName": "broccoli" });
    expect(suggestions[1]).toMatchObject(
      {
        "foodName": "broccoli",
        "amount": "1 cup florets",
        "bestChoice": true
      }
    );
    expect(suggestions[2]).toMatchObject(
      {
        "foodName": "Broccoli",
        "amount": "1 cup florets",
        "bestChoice": true
      }
    );
  }
  generateSuggestions(new MockRefObject("Broccoli"), assert);
})

test("search with more than 5 words suggestions e.g. 'pea' should return exactly 5 rows with just 'foodName' key in objects, and one of them should be 'pea'", () => {
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

test("search with no match e.g. 'longan' should return exactly 1 row with 'longan'", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toEqual(1);
    expect(suggestions).toContainEqual<Suggestion>({ foodName: "longan" });
  }
  generateSuggestions(new MockRefObject("longan"), assert);
})
