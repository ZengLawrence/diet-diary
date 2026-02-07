import { Save2, Save2Fill } from "react-bootstrap-icons";

function SavedFoodIcon(props: {
  mealIndex: number;
  foodIndex: number;
  isSaved?: boolean;
}) {
  if (props.isSaved) {
    return (<Save2Fill size={24} className="dd-fill-success" />);
  } else {
    return (<Save2 size={24} className="dd-fill-gray-300" />);
  };
}

export default SavedFoodIcon;