import _ from "lodash";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";
import { Fragment } from "react";

function foodGroupsWithServing(serving: Serving) {
  const hasServing = (fg: string) => !_.isUndefined(_.get(serving, fg));
  return [
    'vegetable',
    'fruit',
    'carbohydrate',
    'proteinDiary',
    'fat',
    'sweet',
  ].filter(hasServing) as FoodGroup[];
}

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => {
  const { serving } = props;

  const foodGroups = foodGroupsWithServing(serving);
  return (
    <span>
      {foodGroups.map((fg, i) => (
        <Fragment key={i}>
          <FoodGroupServingBadge foodGroup={fg} serving={serving} />
        </Fragment>
      ))
      }
    </span>
  );
}
