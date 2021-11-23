import ChangeTargetButton from "../../features/target/ChangeTargetButton";
import NoTargetPanel from "../../features/target/NoTargetPanel";
import TargetCaloriePanel from "../../features/target/TargetCaloriePanel";
import { VariantSecondary } from "../buttons/ButtonVariant";

interface Props {
  noTarget: boolean;
  showChangeTargetButton: boolean;
}

export const TargetPanel = (props: Props) => {
  const { noTarget, showChangeTargetButton } = props;

  return (
    <div className="d-flex align-items-center">
      {noTarget ? <NoTargetPanel /> : <TargetCaloriePanel />}&nbsp;
      {showChangeTargetButton
        && <ChangeTargetButton variant={VariantSecondary}>Change</ChangeTargetButton>}
    </div>
  );
};
