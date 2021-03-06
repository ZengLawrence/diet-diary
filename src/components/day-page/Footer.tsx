import { FoodGroupLegend } from "../FoodGroupLegend";
import { EatLessToTargetIcon, EatMoreToTargetIcon, MeetTargetIcon } from "../summary/TargetActionIcon";

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
  <div className="d-flex justify-content-between flex-fill flex-wrap">
    <FoodGroupLegend foodGroup="vegetable" />
    <FoodGroupLegend foodGroup="fruit" />
    <FoodGroupLegend foodGroup="carbohydrate" />
    <FoodGroupLegend foodGroup="proteinDiary" />
    <FoodGroupLegend foodGroup="fat" />
    <FoodGroupLegend foodGroup="sweet" />
  </div>
);

const TargetActionLegends = () => (
  <div className="w-100 d-flex justify-content-between justify-content-sm-start flex-fill flex-wrap">
    <div className="mr-sm-1 border-0 rounded bg-light">
      <EatLessToTargetIcon />Eat Less
    </div>
    <div className="mr-sm-1 border-0 rounded bg-light">
      <MeetTargetIcon />On Target
    </div>
    <div className="border-0 rounded bg-light">
      <EatMoreToTargetIcon />Eat More
    </div>
  </div>
)

export const Footer = (props: { showTargetActionLegends: boolean }) => (
  <div className="d-flex flex-column align-items-center">
    <div className="d-block d-sm-none">
      <FoodGroupLegends />
    </div>
    {props.showTargetActionLegends && <TargetActionLegends />}
    <Icons8Referral />
  </div>
);