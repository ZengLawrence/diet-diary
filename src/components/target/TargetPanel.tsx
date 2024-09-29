import NoTargetPanel from "../../features/target/NoTargetPanel";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";

interface Props {
  noTarget: boolean;
}

export const TargetPanel = (props: Props) => (
  props.noTarget ? <NoTargetPanel /> : <TargetCaloriePanel />
);
