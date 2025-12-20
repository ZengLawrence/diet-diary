import _ from "lodash";
import type { FoodGroup } from "../model/Food";
import { displayName } from "../model/Food";
import { FoodGroupLabelBadge } from "./badge";
import { Legend } from "./Legend";

export const FoodGroupLegend = (props: { foodGroup: FoodGroup; className?: string }) => {
  const { foodGroup } = props;
  return (
    <Legend className={_.join(["d-flex", "flex-nowrap", props.className], " ")}>
      <FoodGroupLabelBadge foodGroup={foodGroup} />{displayName(foodGroup)}
    </Legend>
  );
};
