import TargetDropDown from "../../features/target/TargetDropDown";
import TargetLabel from "../../features/target/TargetLabel";

export const NoTargetPanel = (props: { editTarget: boolean; }) => {
  const { editTarget } = props;
  return (
    (editTarget ? <TargetDropDown /> : <TargetLabel />)
  );
};
