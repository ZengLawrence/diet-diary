import { abbreviation, displayName, FoodGroup } from "../model/Food";
import { FoodGroupBadge } from "./badge";

export const FoodGroupLegend = (props: { foodGroup: FoodGroup; }) => {
  const { foodGroup } = props;
  return (
    <div className="d-flex justify-content-center border-0 rounded bg-light">
      <FoodGroupBadge foodGroup={foodGroup} value={abbreviation(foodGroup)} />
      <div>{displayName(foodGroup)}</div>
    </div>
  );
};
