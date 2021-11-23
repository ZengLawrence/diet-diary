import { faAngleDoubleDown, faAngleDoubleUp, faBullseye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EatMoreToTargetIcon = () => (
  <FontAwesomeIcon icon={faAngleDoubleUp} color={"Orange"} />
)

const MeetTargetIcon = () => (
  <FontAwesomeIcon icon={faBullseye} color={"Green"} />
)

const EatLessToTargetIcon = (props: { warning: boolean; }) => (
  <FontAwesomeIcon icon={faAngleDoubleDown} color={props.warning ? "Red" : "Orange"} />
)

export type TargetAction = "DoMore" | "MeetTarget" | "DoLess";

export const TargetAchievementIcon = (props: { action: TargetAction; eatLessWarning: boolean; }) => {
  switch (props.action) {
    case "DoMore":
      return <EatMoreToTargetIcon />;
    case "MeetTarget":
      return <MeetTargetIcon />;
    default:
      return <EatLessToTargetIcon warning={props.eatLessWarning} />;
  }
}