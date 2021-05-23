import { FoodGroupLegend } from "./FoodGroupLegend";

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

export const Footer = () => (
  <div className="d-flex flex-column align-items-center">
    <div className="d-block d-sm-none">
      <FoodGroupLegends />
    </div>
    <Icons8Referral />
  </div>
);