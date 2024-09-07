import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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

const Legend = (props: React.PropsWithChildren<{}>) => (
  <div className="border-0 rounded bg-light">
    {props.children}
  </div>
);

const TargetActionLegends = () => (
  <div className="d-flex justify-content-between justify-content-sm-start grid gap-0 column-gap-3">
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
  <Row className="grid gap-0 row-gap-3">
    <Row>
      <div className="d-block d-sm-none">
        <FoodGroupLegends />
      </div>
    </Row>
    <Row>
      {props.showTargetActionLegends && <TargetActionLegends />}
    </Row>
    <Row>
      <Col className="d-flex justify-content-center">
        <Icons8Referral />
      </Col>
    </Row>
  </Row>
);