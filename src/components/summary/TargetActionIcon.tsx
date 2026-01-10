import { Bullseye, ChevronDoubleDown, ChevronDoubleUp } from "react-bootstrap-icons";

export const EatMoreToTargetIcon = () => (
  <ChevronDoubleUp color={"Orange"} />
)

export const MeetTargetIcon = () => (
  <Bullseye color={"Green"} />
)

export const EatLessToTargetIcon = (props: { warning?: boolean; }) => (
  <ChevronDoubleDown color={props.warning ? "Red" : "Orange"} />
)

export type TargetAction = "DoMore" | "MeetTarget" | "DoLess";

export const TargetActionIcon = (props: { action: TargetAction; eatLessWarning: boolean; }) => {
  switch (props.action) {
    case "DoMore":
      return <EatMoreToTargetIcon />;
    case "MeetTarget":
      return <MeetTargetIcon />;
    default:
      return <EatLessToTargetIcon warning={props.eatLessWarning} />;
  }
}