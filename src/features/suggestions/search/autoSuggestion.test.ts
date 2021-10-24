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
  const result = generateAutoSuggestion([autoCompletion], suggestions);
  expect(result).toEqual({
    foodName: "broccoli",
    amount: "1 cup florets",
    serving: {
      vegetable: 1
    }
  });
})

test("Auto completion has food name and partially matching amount e.g. 'broccoli 1 cu' should add serving from suggestions", () => {
  const autoCompletion = {
    foodName: "broccoli",
    amount: "1 cu"
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
  const result = generateAutoSuggestion([autoCompletion], suggestions);
  expect(result).toEqual({
    foodName: "broccoli",
    amount: "1 cup florets",
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
  const result = generateAutoSuggestion([autoCompletion], suggestions);
  expect(result).toEqual({
    foodName: "broccoli",
    amount: "2 cups",
    serving: {
      vegetable: 2
    }
  });
})