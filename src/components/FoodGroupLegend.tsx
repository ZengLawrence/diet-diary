import { displayName, FoodGroup } from "../model/Food";
import { FoodGroupLabelBadge } from "./badge";

export const FoodGroupLegend = (props: { foodGroup: FoodGroup; }) => {
  const { foodGroup } = props;
  return (
    <div className="d-flex justify-content-center border-0 rounded bg-light">
      <FoodGroupLabelBadge foodGroup={foodGroup} />
      <div>{displayName(foodGroup)}</div>
    </div>
  );
};
