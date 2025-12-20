import { Fragment } from "react";
import type { FoodGroup } from "../../model/Food";
import { FoodGroupLabelBadge } from "../badge";
import { FoodGroupLegend } from "../FoodGroupLegend";

export const FoodGroupLabel = (props: { foodGroup: FoodGroup; }) => (
  <Fragment>
    <div className="d-block d-sm-none">
      <FoodGroupLabelBadge foodGroup={props.foodGroup} />
    </div>
    <div className="d-none d-sm-block">
      <FoodGroupLegend foodGroup={props.foodGroup} />
    </div>
  </Fragment>
);
