import { describe, expect, test } from "@jest/globals";
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import decompose from './food-description-regex-parser';

test("Given only food name not space at the end, then food name and unit completed flags are false", () => {
  const result = decompose("broccoli");
  expect(result).toMatchObject({
    foodName: "broccoli",
    foodNameCompleted: false,
    unitCompleted: false,
  });
})

test("Given only food name with a space at the end, then space is removed from food name, food name completed flag is true and unit completed flag is false", () => {
  const result = decompose("broccoli ");
  expect(result).toMatchObject({
    foodName: "broccoli",
    foodNameCompleted: true,
    unitCompleted: false,
  });
})

test("Given food name with quantity, then food name completed flag is true and unit completed flag is false", () => {
  const result = decompose("broccoli 1");
  expect(result).toMatchObject({
    foodName: "broccoli",
    foodNameCompleted: true,
    amount: "1",
    unitCompleted: false,
  });
})

test("Given food name with quantity ending with a space, then amount with trailing space removed, food name completed flag is true and unit completed flag is false", () => {
  const result = decompose("broccoli 1 ");
  expect(result).toMatchObject({
    foodName: "broccoli",
    foodNameCompleted: true,
    amount: "1",
    unitCompleted: false,
  });
})

test("Given food name and amount, then food name completed flag is true and unit completed flag is false", () => {
  const result = decompose("broccoli 1 cup");
  expect(result).toMatchObject({
    foodName: "broccoli",
    foodNameCompleted: true,
    amount: "1 cup",
    unitCompleted: false,
  });
})

test("Given food name and amount with a trailing space, then amount with trailing space removed, food name completed and unit completed flag are true", () => {
  const result = decompose("broccoli 1 cup ");
  expect(result).toMatchObject({
    foodName: "broccoli",
    foodNameCompleted: true,
    amount: "1 cup",
    unitCompleted: true,
  });
})

test("Given food name and amount with a right parenthesis, then food name completed and unit completed flag are true", () => {
  const result = decompose("doughnut 1 (3 1/4 dia.)");
  expect(result).toMatchObject({
    foodName: "doughnut",
    foodNameCompleted: true,
    amount: "1 (3 1/4 dia.)",
    unitCompleted: true,
  });
})

test("Given food with ounce unit i.e. 2-ounce roll, then food name completed is true and unit completed flag is false", () => {
  const result = decompose("egg rolls 2-ounce roll");
  expect(result).toMatchObject({
    foodName: "egg rolls",
    foodNameCompleted: true,
    amount: "2-ounce roll",
    unitCompleted: false,
  });
})

test("Given 'egg rolls 1 2-ounce roll', then food name completed is true and unit completed flag is false", () => {
  const result = decompose("egg rolls 1 2-ounce roll");
  expect(result).toMatchObject({
    foodName: "egg rolls",
    foodNameCompleted: true,
    amount: "1 2-ounce roll",
    unitCompleted: false,
  });
})

type TestData = {
  input: string;
  food_name: string;
  amount: string;
}

function loadTestData(): TestData[] {
  const filePath = path.resolve(__dirname, 'food-description-test-data.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
}

describe("Food description regex parser data-driven tests", () => {
  const testData = loadTestData();
  testData.forEach(({input, food_name, amount}) => {
    test(`Given input "${input}", then food name is "${food_name}" and amount is "${amount}"`, () => {
      const result = decompose(input);
      expect(result.foodName).toBe(food_name);
      expect(result.amount ?? "").toBe(amount);
    });
  });
});
