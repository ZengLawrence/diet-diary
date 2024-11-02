import { displayName, FoodGroup } from "../model/Food";
import { FoodGroupLabelBadge } from "./badge";
import { Legend } from "./Legend";

export const FoodGroupLegend = (props: { foodGroup: FoodGroup; }) => {
  const { foodGroup } = props;
  return (
    <Legend className="d-flex flex-nowrap">
      <FoodGroupLabelBadge foodGroup={foodGroup} />{displayName(foodGroup)}
    </Legend>
  );
};
