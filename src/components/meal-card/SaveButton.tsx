import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mealsSelector } from "../../app/selectors";
import { showSavedMealAlert } from "../../features/day-page/mealStatesSlice";
import { save } from "../../features/saved-meal/savedMealsSlice";
import { Meal } from "../../model/Food";

interface Props {
  mealIndex: number;
  variant?: string;
}

export const SaveButton = (props: Props) => {

  const meals = useSelector(mealsSelector);
  const dispatch = useDispatch();

  const saveMeal = (mealIndex: number, meal: Meal) => {
    dispatch(save(meal));
    dispatch(showSavedMealAlert(mealIndex));
  }

  const handleClick = () => saveMeal(props.mealIndex, meals[props.mealIndex]);

  return (
    <Button variant={props.variant} onClick={handleClick}>
      Save
    </Button>
  )
}