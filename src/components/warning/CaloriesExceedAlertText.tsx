import { Fragment } from "react";

const CaloriesExceedAlertText = (props: { percentage: number }) => (
  <Fragment>
    Total calories exceed target by <span className="fw-bold">{`${props.percentage}%`}</span>.
  </Fragment>
);

export default CaloriesExceedAlertText;