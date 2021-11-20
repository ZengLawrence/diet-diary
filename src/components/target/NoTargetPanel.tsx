import { Fragment } from "react";
import TargetDropDown from "../../features/target/TargetDropDown";

export const NoTargetPanel = (props: { editTarget: boolean; }) => {
  const { editTarget } = props;
  return (
    (editTarget ? <TargetDropDown /> : <Fragment>No Target</Fragment>)
  );
};
