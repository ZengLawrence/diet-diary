import { Button, ButtonProps } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Food } from "../../model/Food";
import { addSavedMeal } from "../../features/day-page/mealStatesSlice";
import { select } from "../../features/save-meal/savedMealsSlice";

interface Props extends ButtonProps {
  mealIndex: number;
  meal: {foods: Food[];};
}

export const SelectButton = (props: Props) =>{

  const dispatch = useDispatch();

  const onclick = () => {
    dispatch(addSavedMeal(props.meal));
    dispatch(select(props.mealIndex));
  }
  return (
  <Button {...props} onClick={onclick} />
)}