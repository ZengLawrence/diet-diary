import NoTargetPanel from "../../features/target/NoTargetPanel";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";

interface Props {
  noTarget: boolean;
  showChangeTargetButton: boolean;
}

export const TargetPanel = (props: Props) => {
  const { noTarget } = props;

  return (noTarget ? <NoTargetPanel /> : <TargetCaloriePanel />);
};
