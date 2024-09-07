import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../features/saved-meal/savedMealsSlice";
import { mealsSelector } from "../../app/selectors";
import { showSavedMealAlert } from "../../features/day-page/mealStatesSlice";

interface Props {
  mealIndex: number;
  variant?: string;
}

export const SaveButton = (props: Props) =>{

  const meals = useSelector(mealsSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    const meal = meals[props.mealIndex];
    dispatch(save(meal));
    dispatch(showSavedMealAlert(props.mealIndex));
  }
  return (
  <Button variant={props.variant} onClick={handleClick}>
    Save
  </Button>
)}