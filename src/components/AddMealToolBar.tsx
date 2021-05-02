import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { newMealAction } from "../actions";
import { MealDispatch } from "./MealDispatch";

export const AddMealToolBar = () => {
  const dispatch = useContext(MealDispatch);
  
  return (
    <div className="text-primary">
      <FontAwesomeIcon
        icon={faPlus}
        size="2x" 
        onClick={() => dispatch(newMealAction())} 
        />
    </div>
  );
}
