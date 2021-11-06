import _ from "lodash";
import React from "react";
import { generateSuggestions } from "./generateSuggestion";
import { Suggestion } from "../Suggestion";

class MockRefObject implements React.MutableRefObject<String> {
  current: String;
  constructor(val: string) {
    this.current = val;
  }
}

test("search for full name e.g. 'broccoli' should return at least 3 rows.  First 3 rows: 1) 'broccoli' word suggestion, 2) 'broccoli' word suggestion with serving, 3) serving suggestion", () => {
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
  generateSuggestions(new MockRefObject("broccoli"), assert);
})

test("search for exact name e.g. 'Broccoli' should return at least 2 rows.  First 2 rows: 1) 'broccoli' word suggestion, 2) serving suggestion", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(2);
    expect(suggestions[0]).toMatchObject({ "foodName": "Broccoli" });
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

test("search with multiple matches e.g. 'peanut butter' should auto suggest with amount and serving from food name starts with 'peanut butter'", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(2);
    expect(suggestions[0]).toMatchObject({ "foodName": "peanut butter" });
    expect(suggestions[1]).toMatchObject(
      {
        "foodName": "peanut butter",
        "amount": "1 1/2 teaspoons",
        "serving": {
          "fat": 1
        }
      }
    );
  }
  generateSuggestions(new MockRefObject("peanut butter"), assert);
})

test("search with multiple matches and word is completed i.e space after the word e.g. 'peas ' should auto suggest with amount and serving from food name starts with 'peas'", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(2);
    expect(suggestions[0]).toMatchObject({ "foodName": "peas" });
    expect(suggestions[1]).toMatchObject(
      {
        "foodName": "peas",
        "amount": "1/2 cup",
        "serving": {
          "proteinDiary": 1
        }
      }
    );
  }
  generateSuggestions(new MockRefObject("peas "), assert);
})

test("search with multiple matches and word is completed i.e space after the word, with capitalized letter e.g. 'Peas ' should auto suggest with amount and serving from food name starts with 'peas'", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(2);
    expect(suggestions[0]).toMatchObject({ "foodName": "Peas" });
    expect(suggestions[1]).toMatchObject(
      {
        "foodName": "Peas",
        "amount": "1/2 cup",
        "serving": {
          "proteinDiary": 1
        }
      }
    );
  }
  generateSuggestions(new MockRefObject("Peas "), assert);
})

test("search with multiple matches and with capitalized letter e.g. 'Peas' should auto suggest names with capitalized letter", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(1);
    _.map(suggestions, "foodName").forEach(foodName => {
      expect(foodName).toMatch(_.capitalize(foodName));
    });
  }
  generateSuggestions(new MockRefObject("Peas"), assert);
})

test("search with auto complete unit e.g. 'milk 8 flu' should auto suggest 'milk 8 fluid'", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(1);
    expect(suggestions[0]).toMatchObject(
      {
        "foodName": "milk",
        "amount": "8 fluid",
      }
    );
  }
  generateSuggestions(new MockRefObject("milk 8 flu"), assert);
})

test("stop auto completion if space after unit e.g. 'peanuts 8 wholes '", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(2);
    expect(suggestions[0]).toMatchObject(
      {
        foodName: "peanuts",
        amount: "8 wholes",
      }
    );
    expect(suggestions[1]).toMatchObject(
      {
        foodName: "peanuts",
        amount: "8 wholes",
        serving: {
          fat: 1,
        }
      }
    );
  }
  generateSuggestions(new MockRefObject("peanuts 8 wholes "), assert);
})

test("keep suggestions with convertible unit", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(3);
    expect(suggestions[0]).toMatchObject(
      {
        foodName: "chocolate whole milk",
        amount: "8 fluid ounces",
      }
    );
    expect(suggestions[1]).toMatchObject(
      {
        foodName: "chocolate whole milk",
        amount: "8 fluid ounces",
        serving: {
          "proteinDiary": 1,
          "fat": 1
        }
      }
    );
    expect(suggestions[2]).toMatchObject(
      {
        foodName: "Milk, 2% or whole",
        amount: "8 fluid ounces",
        serving: {
          "proteinDiary": 1,
          "fat": 1
        }
      }
    );
  }
  generateSuggestions(new MockRefObject("chocolate whole milk 8 fluid ounces"), assert);

})

test("no deduplicate suggestions", () => {
  const assert = (suggestions: Suggestion[]) => {
    expect(_.size(suggestions)).toBeGreaterThanOrEqual(3);
    // the input
    expect(suggestions[0]).toEqual(
      {
        foodName: "Nuts, peanuts",
        amount: "8 wholes",
      }
    );
    expect(suggestions[1]).toMatchObject(
      {
        foodName: "Nuts, peanuts",
        amount: "8 wholes",
        serving: {
          fat: 1,
        }
      }
    );
    expect(suggestions[2]).not.toMatchObject(
      {
        foodName: "Nuts, peanuts",
        amount: "8 wholes",
        serving: {
          fat: 1,
        }
      }
    );

  }
  // extra space to stop auto complete for food name
  // unit must be one of un-convertible unit
  generateSuggestions(new MockRefObject("Nuts, peanuts 8 wholes "), assert);

})