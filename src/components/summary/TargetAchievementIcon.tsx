import { faAngleDoubleDown, faAngleDoubleUp, faBullseye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EatMoreToTargetIcon = () => (
  <div className="d-flex flex-column justify-content-end align-items-center">
    <FontAwesomeIcon icon={faAngleDoubleDown} color={"LightGrey"} className="d-none d-sm-block" />
    <FontAwesomeIcon icon={faBullseye} color={"Grey"} className="d-none d-sm-block" />
    <FontAwesomeIcon icon={faAngleDoubleUp} color={"Orange"} />
  </div>
)

const MeetTargetIcon = () => (
  <div className="d-flex flex-column justify-content-end align-items-center">
    <FontAwesomeIcon icon={faAngleDoubleDown} color={"LightGrey"} className="d-none d-sm-block" />
    <FontAwesomeIcon icon={faBullseye} color={"Green"} />
    <FontAwesomeIcon icon={faAngleDoubleUp} color={"LightGrey"} className="d-none d-sm-block" />
  </div>
)

const EatLessToTargetIcon = () => (
  <div className="d-flex flex-column justify-content-end align-items-center">
    <FontAwesomeIcon icon={faAngleDoubleDown} color={"Orange"} />
    <FontAwesomeIcon icon={faBullseye} color={"Grey"} className="d-none d-sm-block" />
    <FontAwesomeIcon icon={faAngleDoubleUp} color={"LightGrey"} className="d-none d-sm-block" />
  </div>
)

export type TargetAction = "DoMore" | "MeetTarget" | "DoLess";

export const TargetAchievementIcon = (props: { action: TargetAction }) => {
  switch (props.action) {
    case "DoMore":
      return <EatMoreToTargetIcon />;
    case "MeetTarget":
      return <MeetTargetIcon />;
    default:
      return <EatLessToTargetIcon />;
  }
}