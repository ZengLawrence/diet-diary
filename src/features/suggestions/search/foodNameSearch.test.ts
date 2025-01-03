import _ from "lodash";
import { addOrReplace, findNameSuggestions, findSuggestions, remove } from "./foodNameSearch";

describe("search for serving", () => {
  test("search for exact name e.g. Broccoli should return at least one row and first row is Broccoli", () => {
    const results = findSuggestions("Broccoli");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
  })

  test("case insensitive search e.g. broccoli should return at least one row and first row is Broccoli", () => {
    const results = findSuggestions("broccoli");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Broccoli" });
  })

  test("search term appears in the beginning of name e.g. oatmeal should return at least one row and first row whose name starts with 'Oatmeal'", () => {
    const results = findSuggestions("oatmeal");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0].foodName.startsWith("Oatmeal")).toBeTruthy();
  })

  test("exact search term appears in the middle of name e.g. peanuts should return at least one row and first row is 'Nuts, peanuts'", () => {
    const results = findSuggestions("peanuts");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
  })

  test("misspelled e.g. peanus should return at least one row and first row is 'Nuts, peanuts'", () => {
    const results = findSuggestions("peanus");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Nuts, peanuts" });
  })

  test("drop last word - last search term not found e.g. 'coconut chew' should return at least one row and first row is 'Coconut, shredded, sweetened'", () => {
    const results = findSuggestions("coconut chew");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Coconut, shredded, sweetened" });
  })

  test("search term appears exactly in the name e.g. 'Corn on the cob' should return at least one row and first row is 'Corn on the cob'", () => {
    const results = findSuggestions("Corn on the cob");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Corn on the cob" });
  })

  test("search term appears in the second node in the name e.g. 'salmon' in 'Fish, Atlantic salmon, grilled or boiled' should return that row", () => {
    const results = findSuggestions("salmon");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Fish, Atlantic salmon, grilled or boiled" });
  })

  test("search term appears in different order as in the list e.g. 'Italian salad dressing fat free' in 'Salad dressing, Italian, fat-free' should return that row", () => {
    const results = findSuggestions("Italian salad dressing fat free");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Salad dressing, Italian, fat-free" });
  })

  test("search for exact name for portion e.g. 'Caesar salad' should return 'Caesar salad with grilled chicken'", () => {
    const results = findSuggestions("Caesar salad");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Caesar salad with grilled chicken" });
  })

  test("search for 'peanut butter' should return 'peanut butter' as first result", () => {
    const results = findSuggestions("peanut butter");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Peanut butter, chunky or smooth" });
  })

  test("search for 'skim milk' should return 'Milk, skim or 1%' as first result", () => {
    const results = findSuggestions("skim milk");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ "foodName": "Milk, skim or 1%" });
  })

  test("search for 'chocolate whole milk' should return 'chocolate milk' and 'whole milk' in top 3 results", () => {
    const results = findSuggestions("chocolate whole milk", { convertibleFrom: "fl-oz" });
    expect(_.size(results)).toBeGreaterThanOrEqual(2);
    expect(results[0]).toMatchObject({ foodName: "Milk, 2% or whole" });
    expect(results[1]).toMatchObject({ foodName: "Chocolate milk, made with skim or 1% milk" });
  })

  test("search result contains all search terms should rank higher", () => {
    const results = findSuggestions("orange juice", { convertibleFrom: "fl-oz" });
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ foodName: "Juice, orange, grapefruit or pineapple, unsweetened" });
  })

  test("search result should return if unit on alternate measurement matches", () => {
    const results = findSuggestions("orange", { convertibleFrom: "medium" });
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({
      foodName: "Orange",
      amount: "3/4 cup sections or 1 medium",
    });
  })

});

describe("auto complete food name", () => {
  test("auto complete food name for a partial name e.g. 'brocco' should return 'broccoli'", () => {
    const results = findNameSuggestions("brocco");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ foodName: "broccoli" });
  })

  test("auto complete food name for a partial name with first letter capitalized e.g. 'Brocco' should return keep same case in suggestion e.g. 'Broccoli'", () => {
    const results = findNameSuggestions("Brocco");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ foodName: "Broccoli" });
  })

  test("auto complete food name for multiple word name e.g. 'peanut butt' should return 'peanut butter'", () => {
    const results = findNameSuggestions("peanut butt");
    expect(_.size(results)).toBeGreaterThanOrEqual(1);
    expect(results[0]).toMatchObject({ foodName: "peanut butter" });
  })

});

describe("dynamically add new suggestions", () => {
  test("given a new suggestion is added, when search for it, should get back same suggestion", () => {
    addOrReplace({ foodName: "Mangosteen", amount: "3 fruits", serving: { fruit: 1 } });
    {
      const results = findNameSuggestions("Mangosteen");
      expect(_.size(results)).toEqual(1);
      expect(results[0]).toMatchObject({ foodName: "Mangosteen" });
    }

    {
      const results = findSuggestions("Mangosteen");
      expect(_.size(results)).toEqual(1);
      expect(results[0]).toMatchObject({ foodName: "Mangosteen", amount: "3 fruits", serving: { fruit: 1 } });
    }

  })

  test("given a new suggestion is added more than once, when search for it, should get back last updated suggestion", () => {
    addOrReplace({ foodName: "Mangosteen", amount: "3 fruits", serving: { fruit: 1 } });
    addOrReplace({ foodName: "Mangosteen", amount: "2 fruits", serving: { fruit: 1 } });
    const results = findSuggestions("Mangosteen");
    expect(_.size(results)).toEqual(1);
    expect(results[0]).toMatchObject({ foodName: "Mangosteen", amount: "2 fruits", serving: { fruit: 1 } });
  })

  describe("given a suggestion is added then removed", () => {
    const suggestion = { foodName: "Mangosteen", amount: "3 fruits", serving: { fruit: 1 } };
    addOrReplace(suggestion);
    const results = findNameSuggestions("Mango");
    expect(_.size(results)).toEqual(2);
    expect(results[0]).toMatchObject({ foodName: "Mango" });
    expect(results[1]).toMatchObject({ foodName: "Mangosteen" });

    remove(suggestion);

    describe("when search for it", () => {
      const results = findNameSuggestions("Mango");

      it("should NOT get it back", () => {
        expect(_.size(results)).toEqual(1);
        expect(results[0]).toMatchObject({ foodName: "Mango" });
      });
    });
  })

});