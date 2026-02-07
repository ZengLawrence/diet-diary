import { Save2, Save2Fill } from "react-bootstrap-icons";

function SavedFoodIcon(props: {
  mealIndex: number;
  foodIndex: number;
  isSaved?: boolean;
  onClick?: () => void;
}) {
  if (props.isSaved) {
    return (<Save2Fill size={24} className="dd-fill-success" onClick={props.onClick} />);
  } else {
    return (<Save2 size={24} className="dd-fill-secondary" onClick={props.onClick} />);
  };
}

export default SavedFoodIcon;