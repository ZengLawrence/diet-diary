import _ from "lodash";
import { FoodGroup, Serving } from "../../model/Food";
import { FoodGroupServingBadge } from "../badge";
import { Fragment } from "react";

function findDefinedServings(serving: Serving) {
  const foodGroups: FoodGroup[] = [];
  if (!_.isUndefined(serving.vegetable)) {
    foodGroups.push("vegetable");
  }
  if (!_.isUndefined(serving.fruit)) {
    foodGroups.push("fruit");
  }
  if (!_.isUndefined(serving.carbohydrate)) {
    foodGroups.push("carbohydrate");
  }
  if (!_.isUndefined(serving.proteinDiary)) {
    foodGroups.push("proteinDiary");
  }
  if (!_.isUndefined(serving.fat)) {
    foodGroups.push("fat");
  }
  if (!_.isUndefined(serving.sweet)) {
    foodGroups.push("sweet");
  }
  return foodGroups;
}

export const FoodGroupServingBadgePanel = (props: { serving: Serving; }) => {
  const { serving } = props;

  const foodGroups = findDefinedServings(serving);
  return (
    <span>
      {foodGroups.map((fg, i) => (
        <Fragment key={i}>
          <FoodGroupServingBadge foodGroup={fg} serving={serving} />&nbsp;
        </Fragment>
      ))
      }
    </span>
  );
}
