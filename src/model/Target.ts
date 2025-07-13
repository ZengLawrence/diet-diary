export type Gender = "man" | "woman";

export function defaultGender(gender: Gender) {
  switch(gender) {
    case "man":
    case "woman":
      return gender;
    default:
      return "man";
  }
}

const TARGET_1200_CALORIE: Target = {
  calorie: 1200,
  serving: {
    vegetable: 4,
    fruit: 3,
    carbohydrate: 4,
    proteinDiary: 3,
    fat: 3,
    sweet: 1,
  }
}

const TARGET_1400_CALORIE: Target = {
  calorie: 1400,
  serving: {
    vegetable: 4,
    fruit: 4,
    carbohydrate: 5,
    proteinDiary: 4,
    fat: 3,
    sweet: 1,
  }
}

const TARGET_1600_CALORIE: Target = {
  calorie: 1600,
  serving: {
    vegetable: 5,
    fruit: 5,
    carbohydrate: 6,
    proteinDiary: 5,
    fat: 3,
    sweet: 1,
  }
}

const TARGET_1800_CALORIE: Target = {
  calorie: 1800,
  serving: {
    vegetable: 5,
    fruit: 5,
    carbohydrate: 7,
    proteinDiary: 6,
    fat: 4,
    sweet: 1,
  }
}

const TARGET_2000_CALORIE: Target = {
  calorie: 2000,
  serving: {
    vegetable: 5,
    fruit: 5,
    carbohydrate: 8,
    proteinDiary: 7,
    fat: 5,
    sweet: 1,
  }
}

export interface Target {
  calorie: number;
  serving: {
    vegetable: number;
    fruit: number;
    carbohydrate: number;
    proteinDiary: number;
    fat: number;
    sweet: number;
  };
}

export function defaultTargets(): Target[] {
  return [
    TARGET_1200_CALORIE,
    TARGET_1400_CALORIE,
    TARGET_1600_CALORIE,
    TARGET_1800_CALORIE,
    TARGET_2000_CALORIE,
  ];
}

export function manTarget(target: Target) {
  return target.calorie >= 1400 && target.calorie <= 2000;
}

export function womanTarget(target: Target) {
  return target.calorie >= 1200 && target.calorie <= 1800;
}

export function getDefaultTarget(calorie: number = 1600) {
  switch (calorie) {
    case 1200:
      return TARGET_1200_CALORIE;
    case 1400:
      return TARGET_1400_CALORIE;
    case 1600:
      return TARGET_1600_CALORIE;
    case 1800:
      return TARGET_1800_CALORIE;
    case 2000:
      return TARGET_2000_CALORIE;
    default:
      return TARGET_1600_CALORIE;
  }
}

export function isValidCalorieTargetLevel(calorieLevel: number): boolean {
  return calorieLevel === 1200 
    || calorieLevel === 1400
    || calorieLevel === 1600
    || calorieLevel === 1800
    || calorieLevel === 2000;
}