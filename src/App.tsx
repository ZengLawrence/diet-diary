import { Container } from "react-bootstrap";
import { DayPage } from "./container/DayPage";
import { Food, Meal } from "./model/Food";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useReducer } from "react";
import { Action, AddFoodAction } from "./Action";
import { MealDispatch } from "./MealDispatch";
import _ from "lodash";

const breakfast: Meal = {
  mealTime: "10am",
  foods: [
    { name: "breakfast", serving: { vegetable: 1, fruit: 2, carbohydrate: 3, protein: 4, fat: 5, sweet: 6 } },
    { name: "coffee", serving: { protein: 0.25 } },
    { name: "bread", serving: { carbohydrate: 1.5 } },
    { name: "humus", serving: { protein: 0.75 } },
    { name: "cucumber", serving: { vegetable: 1 } },
    { name: "cantaloupe", serving: { fruit: 1 }, }
  ]
};

const lunch: Meal = {
  mealTime: "12pm",
  foods: [
    { name: "rice", serving: { carbohydrate: 1.5 } },
    { name: "chicken", serving: { protein: 2 } },
    { name: "vege", serving: { vegetable: 2 } },
    { name: "pear", serving: { fruit: 1 }, }
  ]
};


const INITIAL_STATE: AppState = {
  meals: [breakfast, lunch],
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
      const {mealIndex} = addFoodAction;
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

function mealReducer(state: Meal, action: {type: string; food: Food}) {
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
