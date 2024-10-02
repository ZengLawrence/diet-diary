import _ from "lodash";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";
import { Fragment } from "react";

function getFoodGroups(serving: Serving) {
  const hasServing = (foodGroup: string) => !_.isUndefined(_.get(serving, foodGroup));
  return ([
    'vegetable',
    'fruit',
    'carbohydrate',
    'proteinDiary',
    'fat',
    'sweet',
  ] as FoodGroup[]).filter(hasServing);
}

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => {
  const { serving } = props;

  const foodGroups = getFoodGroups(serving);
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
