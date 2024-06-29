import { Button, ButtonProps } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../features/save-meal/savedMealsSlice";
import { mealsSelector } from "../../app/selectors";

interface Props extends ButtonProps {
  mealIndex: number;
}

export const SaveButton = (props: Props) =>{

  const meals = useSelector(mealsSelector);
  const dispatch = useDispatch();

  const onclick = () => {
    const meal = meals[props.mealIndex];
    dispatch(save(meal));
  }
  return (
  <Button {...props} onClick={onclick} />
)}