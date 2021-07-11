export interface Fillable {
  fillFoodName: boolean; // by default fills serving only
}

export function initFillable<T>(obj: T): (T & Fillable) {
  return {
    ...obj,
    fillFoodName: false,
  };
}
