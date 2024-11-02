import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Serving } from "../../model/Food";
import { ServingCell } from "./ServingCell";

export const ServingSummary = (props: { serving: Serving; }) => (
  <Row>
    <Col>
      <Row>
        <ServingCell foodGroup="vegetable" amount={props.serving.vegetable} />
      </Row>
      <Row>
        <ServingCell foodGroup="proteinDiary" amount={props.serving.proteinDiary} />
      </Row>
    </Col>
    <Col>
      <Row>
        <ServingCell foodGroup="fruit" amount={props.serving.fruit} />
      </Row>
      <Row>
        <ServingCell foodGroup="fat" amount={props.serving.fat} />
      </Row>
    </Col>
    <Col>
      <Row>
        <ServingCell foodGroup="carbohydrate" amount={props.serving.carbohydrate} />
      </Row>
      <Row>
        <ServingCell foodGroup="sweet" amount={props.serving.sweet} />
      </Row>
    </Col>
  </Row>
)