import _ from "lodash";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";
import { Fragment } from "react";

function filterFoodGroups(f: (fg: FoodGroup) => boolean) {
  return ([
    'vegetable',
    'fruit',
    'carbohydrate',
    'proteinDiary',
    'fat',
    'sweet',
  ] as FoodGroup[]).filter(f);
}

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => {
  const { serving } = props;

  const hasServing = (foodGroup: string) => !_.isUndefined(_.get(serving, foodGroup));
  const foodGroups = filterFoodGroups(hasServing);
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
