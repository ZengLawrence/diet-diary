import _ from "lodash";
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Food, Meal } from "../../model/Food";
import { calcFoodCalories } from "../../model/calorieFunction";

const denormalizeFood = (food: Food) => ({
  description: food.description,
  vegetable: _.defaultTo(food.serving.vegetable, ""),
  fruit: _.defaultTo(food.serving.fruit, ""),
  carbohydrate: _.defaultTo(food.serving.carbohydrate, ""),
  proteinDiary: _.defaultTo(food.serving.proteinDiary, ""),
  fat: _.defaultTo(food.serving.fat, ""),
  sweet: _.defaultTo(food.serving.sweet, ""),
  calorie: calcFoodCalories(food),
});

export default function exportCsv(date: string, meals: Meal[]) {

  const denormalizeMeal = (meal: Meal) => {
    const { mealTime } = meal;
    return _.map(meal.foods, food => ({ date, mealTime, ...denormalizeFood(food) }));
  };
  const data = _.flatMap(meals, denormalizeMeal);

  const options = {
    // fieldSeparator: ',',
    filename: "diet_diary_" + date,
    // quoteStrings: '"',
    // decimalSeparator: '.',
    showLabels: true,
    //showTitle: true,
    //title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  const csvConfig = mkConfig(options);
  // Converts your Array<Object> to a CsvOutput string based on the configs
  const csv = generateCsv(csvConfig)(data);
  download(csvConfig)(csv);
}
