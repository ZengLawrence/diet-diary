import { HistoryLocalStorage } from "../../app/historyLocalStorage";
import { TodayLocalStorage } from "../../app/todayLocalStorage";
import { createDiary } from "../../model/diary";
import { DiaryHistory } from "../../model/diaryHistory";
import type { Food } from "../../model/Food";
import { SavedFoods, type SavedFoodsLoader, type SavedFoodsSaver } from "../../model/savedFoods";
import { Today } from "../../model/today";
import { preferencesApi } from "../preference/api";
import { customTargets } from "../target";

const historyLocalStorage = new HistoryLocalStorage();
export const diaryHistory = new DiaryHistory(historyLocalStorage, historyLocalStorage);

const todayLocalStorage = new TodayLocalStorage();
export const today = new Today(todayLocalStorage, todayLocalStorage);

export const diary = createDiary(
  today,
  diaryHistory,
  preferencesApi,
  customTargets
);

function createInMemorySavedFoods() {
  class InMemoryPersistence implements SavedFoodsLoader, SavedFoodsSaver {
    private foods: Food[] = [];
    load(): Food[] {
      return this.foods;
    }
    save(foods: Food[]): void {
      this.foods = foods;
    }
  }

  const loader = new InMemoryPersistence();
  const saver = loader;
  return new SavedFoods(loader, saver);
}

export const savedFoods = createInMemorySavedFoods();