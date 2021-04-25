import _ from "lodash";
import { MealCard } from "../components/MealCard";
import { Meal } from "../model/Food";

export const DayPage = (props: {meals: Meal[]}) => {
  const {meals} = props;
  const mealCards = _.map(meals, (meal, index) => <MealCard key={index} meal={meal}/>);
  return (
    <div>
      {mealCards}
    </div>
  )
}