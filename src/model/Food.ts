export interface Serving {
  vegetable?: number;
  fruit?: number;
  carbohydrate?: number;
  protein?: number;
  fat?: number;
  sweet?: number;
}

export interface Food {
  name: string;
  serving: Serving;
}

export interface Meal {
  mealTime: string;
  foods: Food[];
}