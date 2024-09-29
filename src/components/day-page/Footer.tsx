import { FoodGroupLegend } from "../FoodGroupLegend";
import { EatLessToTargetIcon, EatMoreToTargetIcon, MeetTargetIcon } from "../summary/TargetActionIcon";
import { Legend } from "../Legend";

const IconReferLink = () => (
  <a
    target="_blank"
    rel="noreferrer"
    href="https://icons8.com/icons/set/healthy-food-calories-calculator"
  >
    Healthy Food Calories Calculator icon
  </a>
)

const Icon8WebSiteReferLink = () => (
  <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a>
)

const Icons8Referral = () => {
  return (
    <p style={{ fontSize: "smaller" }}>
      <IconReferLink /> icon by <Icon8WebSiteReferLink />
    </p>
  );
};

const FoodGroupLegends = () => (
  <div className="d-flex justify-content-between flex-wrap grid">
    <div className="column">
      <FoodGroupLegend foodGroup="vegetable" />
      <FoodGroupLegend foodGroup="proteinDiary" />
    </div>
    <div className="column">
      <FoodGroupLegend foodGroup="fruit" />
      <FoodGroupLegend foodGroup="fat" />
    </div>
    <div className="column">
      <FoodGroupLegend foodGroup="carbohydrate" />
      <FoodGroupLegend foodGroup="sweet" />
    </div>
  </div>
);

const TargetActionLegends = () => (
  <div className="d-flex grid gap-0 column-gap-3">
    <Legend>
      <EatLessToTargetIcon />Eat Less
    </Legend>
    <Legend>
      <MeetTargetIcon />On Target
    </Legend>
    <Legend>
      <EatMoreToTargetIcon />Eat More
    </Legend>
  </div>
)

export const Footer = (props: { showTargetActionLegends: boolean }) => (
  <div>
    <div className="d-block d-sm-none mb-1">
      <FoodGroupLegends />
    </div>
    {props.showTargetActionLegends && <TargetActionLegends />}
    <div className="d-flex justify-content-center">
      <Icons8Referral />
    </div>
  </div>
);