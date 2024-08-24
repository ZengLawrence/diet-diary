import { Button, ButtonProps } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Food } from "../../model/Food";
import { addSavedMeal } from "../../features/day-page/mealStatesSlice";

interface Props extends ButtonProps {
  meal: {foods: Food[];};
  selectMeal: () => void;
}

export const SelectButton = (props: Props) =>{

  const dispatch = useDispatch();

  const onclick = () => {
    dispatch(addSavedMeal(props.meal));
    props.selectMeal();
  }
  return (
  <Button {...props} onClick={onclick} />
)}