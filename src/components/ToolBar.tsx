import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { MealDispatch } from "./MealDispatch";

export const ToolBar = () => {
  const dispatch = useContext(MealDispatch);
  
  return (
    <div className="d-flex justify-content-end text-primary">
      <FontAwesomeIcon
        icon={faPlus}
        size="2x" 
        onClick={() => dispatch({type: 'new-meal'})} 
        />
    </div>
  );
}
