export interface Serving {
  vegetable?: number;
  fruit?: number;
  carbohydrate?: number;
  protein?: number;
  fat?: number;
  sweeet?: number;
}

export interface Food {
  name: string;
  serving: Serving;
}
