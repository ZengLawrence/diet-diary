import { generateAutoSuggestion } from "./autoSuggestion";

test("Auto completion has food name only e.g. 'broccoli' should add serving from suggestions", () => {
  const autoCompletion = {
    foodName: "broccoli",
  }
  const suggestions = [
    {
      foodName: "Broccoli",
      amount: "1 cup florets",
      serving: {
        vegetable: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "broccoli",
    amount: "1 cup florets",
    serving: {
      vegetable: 1
    }
  });
})

test("Auto completion has food name and partially matching amount e.g. 'broccoli 1 cup', should keep amount and add serving from suggestions", () => {
  const autoCompletion = {
    foodName: "broccoli",
    amount: "1 cup"
  }
  const suggestions = [
    {
      foodName: "Broccoli",
      amount: "1 cup florets",
      serving: {
        vegetable: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "broccoli",
    amount: "1 cup",
    serving: {
      vegetable: 1
    }
  });
})

test("Auto completion has food name and different amount e.g. 'broccoli 2 cups' should calculate servings from suggestions", () => {
  const autoCompletion = {
    foodName: "broccoli",
    amount: "2 cups"
  }
  const suggestions = [
    {
      foodName: "Broccoli",
      amount: "1 cup florets",
      serving: {
        vegetable: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "broccoli",
    amount: "2 cups",
    serving: {
      vegetable: 2
    }
  });
})

test("Fraction amount e.g. 1/2 cup", () => {
  const autoCompletion = {
    foodName: "Beans, black",
    amount: "1/2 cup",
  }
  const suggestions = [
    {
      foodName: "Beans, black",
      amount: "1/2 cup",
      serving: {
        proteinDiary: 1
      }
    },
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "Beans, black",
    amount: "1/2 cup",
    serving: {
      proteinDiary: 1
    }
  });
})

test("Fraction amount calculation", () => {
  const autoCompletion = {
    foodName: "Beans, black",
    amount: "1 1/2 cup",
  }
  const suggestions = [
    {
      foodName: "Beans, black",
      amount: "1/2 cup",
      serving: {
        proteinDiary: 1
      }
    },
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "Beans, black",
    amount: "1 1/2 cup",
    serving: {
      proteinDiary: 3
    }
  });
})

test("Fraction calculation round to 3 decimal places", () => {
  const autoCompletion = {
    foodName: "fresh green peas",
    amount: "1 1/4 cup"
  }
  const suggestions = [
    {
      foodName: "Peas, green, fresh or frozen",
      amount: "3/4 cup",
      serving: {
        proteinDiary: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "fresh green peas",
    amount: "1 1/4 cup",
    serving: {
      proteinDiary: 1.667
    }
  });
})

test("Unit conversion: pound -> ounces", () => {
  const autoCompletion = {
    foodName: "beef",
    amount: "1 pound"
  }
  const suggestions = [
    {
      foodName: "Beef, round roast",
      amount: "2 ounces",
      serving: {
        proteinDiary: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "beef",
    amount: "1 pound",
    serving: {
      proteinDiary: 8
    }
  });
})

test("Unconvertible units, do not calculate", () => {
  const autoCompletion = {
    foodName: "black bean",
    amount: "1 pound"
  }
  const suggestions = [
    {
      foodName: "Beans, black",
      amount: "1/2 cup",
      serving: {
        proteinDiary: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "black bean",
    amount: "1 pound",
  });
})

test("unknown unit, treat as same unit", () => {
  const autoCompletion = {
    foodName: "peanuts",
    amount: "8 wholes"
  }
  const suggestions = [
    {
      foodName: "Nuts, peanuts",
      amount: "8 wholes",
      serving: {
        fat: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "peanuts",
    amount: "8 wholes",
    serving: {
      fat: 1
    }
  });
})

test("unknown unit from input, choose the measurement whose unit is also unknown - alternate measurement unit is unknown", () => {
  const autoCompletion = {
    foodName: "pineapple",
    amount: "4 rings"
  }
  const suggestions = [
    {
      foodName: "Pineapple",
      amount: "1/2 cup cubed or 2 rings",
      serving: {
        fruit: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "pineapple",
    amount: "4 rings",
    serving: {
      fruit: 2
    }
  });
})

test("unknown unit from input, choose the measurement whose unit is also unknown - primary measurement unit is unknown", () => {
  const autoCompletion = {
    foodName: "guava",
    amount: "4 fruits"
  }
  const suggestions = [
    {
      foodName: "Guava",
      amount: "2 fruits or 1/2 cup",
      serving: {
        fruit: 1
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "guava",
    amount: "4 fruits",
    serving: {
      fruit: 2
    }
  });
})

test("unit with parenthesis should generate serving suggestion", () => {
  const autoCompletion = {
    foodName: "Doughnut",
    amount: "1 (3 1/4 inch dia.)"
  }
  const suggestions = [
    {
      foodName: "Doughnut, cake (plain)",
      amount: "1 (3 1/4 inch dia.)",
      serving: {
        carbohydrate: 0.5,
        fat: 3,
        sweet: 0.5,
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "Doughnut",
    amount: "1 (3 1/4 inch dia.)",
    serving: {
      carbohydrate: 0.5,
      fat: 3,
      sweet: 0.5,
  }
  });
})

test("unit with open parenthesis should not generate serving suggestion", () => {
  const autoCompletion = {
    foodName: "Doughnut",
    amount: "1 ("
  }
  const suggestions = [
    {
      foodName: "Doughnut, cake (plain)",
      amount: "1 (3 1/4 inch dia.)",
      serving: {
        carbohydrate: 0.5,
        fat: 3,
        sweet: 0.5,
      }
    }
  ]
  const result = generateAutoSuggestion(autoCompletion, suggestions);
  expect(result).toEqual({
    foodName: "Doughnut",
    amount: "1 (3 1/4 inch dia.)",
    serving: {
      carbohydrate: 0.5,
      fat: 3,
      sweet: 0.5,
  }
  });
})
