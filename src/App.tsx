import _ from "lodash";
import { useReducer } from "react";
import { Container } from "react-bootstrap";
import { Action, AddFoodAction } from "./actions";
import { DayPage } from "./container/DayPage";
import { MealDispatch } from "./MealDispatch";
import { Food, Meal } from "./model/Food";

const INITIAL_STATE: AppState = {
  meals: [],
};

function newMeal(): Meal {
  return {
    mealTime: new Date().toLocaleTimeString(),
    foods: [],
  };
}

interface AppState {
  meals: Meal[];
  editState?: string;
}

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'new-meal':
      return {
        ...state,
        meals: [...state.meals, newMeal()],
        editState: "add"
      };
    case 'add-food':
      const addFoodAction = action as AddFoodAction;
      const { mealIndex } = addFoodAction;
      const meals = _.clone(state.meals);
      const updatedMeal = mealReducer(meals[mealIndex], addFoodAction);
      meals[mealIndex] = updatedMeal;
      return {
        ...state,
        meals
      }
    default:
      return state;
  }
}

function mealReducer(state: Meal, action: { type: string; food: Food }) {
  switch (action.type) {
    case 'add-food':
      return {
        ...state,
        foods: [...state.foods, action.food],
      };
    default:
      return state;
  }
}

function App() {
  const [appState, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Container>
      <MealDispatch.Provider value={dispatch} >
        <DayPage meals={appState.meals} editState={appState.editState} />
      </MealDispatch.Provider>
    </Container>
  );
}

export default App;
