import _ from "lodash";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";
import { Fragment } from "react";

function filterFoodGroups(serving: Serving) {
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

  const foodGroups = filterFoodGroups(serving);
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
