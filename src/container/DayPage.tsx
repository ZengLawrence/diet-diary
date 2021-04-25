import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { MealCard } from "../components/MealCard";
import { Meal } from "../model/Food";

const ToolBar = () => (
  <div className="d-flex justify-content-end text-primary" >
    <Link to="/meal">
      <FontAwesomeIcon icon={faPlusSquare} size="3x" />
    </Link>
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