import _ from "lodash";
import { searchFoodServingSize } from "./search";

test("search for oatmeal should return exact one row", () => {
  const results = searchFoodServingSize(["oatmeal"]);
  expect(_.size(results)).toBe(1);
  expect(results[0]).toMatchObject({ "foodName": "Oatmeal, with water, unsweetened" });
})