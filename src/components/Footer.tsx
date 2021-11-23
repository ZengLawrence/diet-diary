import { FoodGroupLegend } from "./FoodGroupLegend";
import { EatLessToTargetIcon, EatMoreToTargetIcon, MeetTargetIcon } from "./summary/TargetAchievementIcon";

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

const TargetAchievementLegends = () => (
  <div className="w-100 d-flex justify-content-between justify-content-sm-start flex-fill flex-wrap">
    <div className="mr-sm-1">
      <EatLessToTargetIcon />Eat Less
    </div>
    <div className="mr-sm-1">
      <MeetTargetIcon />On Target
    </div>
    <div>
      <EatMoreToTargetIcon />Eat More
    </div>
  </div>
)

export const Footer = () => (
  <div className="d-flex flex-column align-items-center">
    <div className="d-block d-sm-none">
      <FoodGroupLegends />
    </div>
    <TargetAchievementLegends />
    <Icons8Referral />
  </div>
);