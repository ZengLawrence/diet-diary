import _ from "lodash";
import { searchFoodPortionSize } from "./search";

test("search for exact name e.g. 'Caesar salad' should return 'Caesar salad with grilled chicken'", () => {
  const results = searchFoodPortionSize("Caesar salad");
  expect(_.size(results)).toBeGreaterThanOrEqual(1);
  expect(results[0]).toMatchObject({ "foodName": "Caesar salad with grilled chicken" });
})
