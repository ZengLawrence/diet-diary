import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Fragment } from "react";
import { MealCard } from "../components/MealCard";
import { Meal } from "../model/Food";

const ToolBar = () => (
  <div className="d-flex justify-content-end" >
    <FontAwesomeIcon icon={faPlusSquare} size="3x" />
  </div>
);

export const DayPage = (props: { meals: Meal[] }) => {
  const { meals } = props;
  const mealCards = _.map(meals, (meal, index) => <MealCard key={index} meal={meal} />);
  return (
    <Fragment>
      <ToolBar />
      {mealCards}
    </Fragment>
  )
}